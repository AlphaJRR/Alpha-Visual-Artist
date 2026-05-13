import { Router, type IRouter, type Request, type Response } from "express";
import { and, asc, desc, eq } from "drizzle-orm";
import { z } from "zod/v4";
import {
  db,
  usersTable,
  projectsTable,
  videosTable,
  commentsTable,
  clientUploadsTable,
} from "@workspace/db";
import { requireAuth, requireAdmin } from "../middlewares/auth";
import { ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const storage = new ObjectStorageService();

router.use(requireAuth);

// ----- Current user -----
router.get("/portal/me", (req: Request, res: Response) => {
  res.json({
    id: req.user!.id,
    email: req.user!.email,
    name: req.user!.name,
    role: req.user!.role,
  });
});

// ----- Clients (admin) -----
router.get(
  "/portal/clients",
  requireAdmin,
  async (_req: Request, res: Response) => {
    const rows = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.role, "client"))
      .orderBy(desc(usersTable.createdAt));
    res.json({ clients: rows });
  },
);

// ----- Projects -----
router.get("/portal/projects", async (req: Request, res: Response) => {
  const user = req.user!;
  const rows =
    user.role === "admin"
      ? await db.select().from(projectsTable).orderBy(desc(projectsTable.createdAt))
      : await db
          .select()
          .from(projectsTable)
          .where(eq(projectsTable.clientUserId, user.id))
          .orderBy(desc(projectsTable.createdAt));
  res.json({ projects: rows });
});

const createProjectBody = z.object({
  clientUserId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  coverImagePath: z.string().max(500).optional(),
});

router.post(
  "/portal/projects",
  requireAdmin,
  async (req: Request, res: Response) => {
    const parsed = createProjectBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid project body" });
      return;
    }
    const [created] = await db
      .insert(projectsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json({ project: created });
  },
);

router.get("/portal/projects/:id", async (req: Request, res: Response) => {
  const user = req.user!;
  const id = String(req.params.id);
  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id))
    .limit(1);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  if (user.role !== "admin" && project.clientUserId !== user.id) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const videos = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.projectId, id))
    .orderBy(asc(videosTable.position), asc(videosTable.createdAt));
  res.json({ project, videos });
});

const updateStatusBody = z.object({
  status: z.enum(["draft", "in_review", "approved", "delivered"]),
});
router.patch(
  "/portal/projects/:id/status",
  async (req: Request, res: Response) => {
    const user = req.user!;
    const id = String(req.params.id);
    const parsed = updateStatusBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (user.role !== "admin" && project.clientUserId !== user.id) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    // Clients may only set 'approved' on their own projects; admins set anything.
    if (user.role !== "admin" && parsed.data.status !== "approved") {
      res.status(403).json({ error: "Clients may only approve" });
      return;
    }
    const [updated] = await db
      .update(projectsTable)
      .set({ status: parsed.data.status })
      .where(eq(projectsTable.id, id))
      .returning();
    res.json({ project: updated });
  },
);

// ----- Videos (admin adds, client views) -----
const createVideoBody = z.object({
  title: z.string().min(1).max(200),
  objectPath: z.string().min(1).max(500),
  thumbnailPath: z.string().max(500).optional(),
  contentType: z.string().max(120).optional(),
  durationSec: z.number().int().nonnegative().optional(),
  position: z.number().int().nonnegative().optional(),
});

router.post(
  "/portal/projects/:id/videos",
  requireAdmin,
  async (req: Request, res: Response) => {
    const projectId = String(req.params.id);
    const parsed = createVideoBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid video body" });
      return;
    }
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .limit(1);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Normalize object path (strip presigned host) and lock down ACL.
    const normalized = storage.normalizeObjectEntityPath(parsed.data.objectPath);
    await storage.trySetObjectEntityAclPolicy(parsed.data.objectPath, {
      owner: req.user!.id,
      visibility: "private",
    });

    const [created] = await db
      .insert(videosTable)
      .values({ ...parsed.data, projectId, objectPath: normalized })
      .returning();
    res.status(201).json({ video: created });
  },
);

router.delete(
  "/portal/videos/:id",
  requireAdmin,
  async (req: Request, res: Response) => {
    await db.delete(videosTable).where(eq(videosTable.id, String(req.params.id)));
    res.json({ ok: true });
  },
);

// ----- Comments -----
const createCommentBody = z.object({
  body: z.string().min(1).max(5000),
  isApproval: z.boolean().optional(),
});

router.get(
  "/portal/videos/:id/comments",
  async (req: Request, res: Response) => {
    const videoId = String(req.params.id);
    const [video] = await db
      .select()
      .from(videosTable)
      .where(eq(videosTable.id, videoId))
      .limit(1);
    if (!video) {
      res.status(404).json({ error: "Video not found" });
      return;
    }
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, video.projectId))
      .limit(1);
    if (
      !project ||
      (req.user!.role !== "admin" && project.clientUserId !== req.user!.id)
    ) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const rows = await db
      .select({
        id: commentsTable.id,
        body: commentsTable.body,
        isApproval: commentsTable.isApproval,
        createdAt: commentsTable.createdAt,
        userId: commentsTable.userId,
        userName: usersTable.name,
        userEmail: usersTable.email,
        userRole: usersTable.role,
      })
      .from(commentsTable)
      .innerJoin(usersTable, eq(usersTable.id, commentsTable.userId))
      .where(eq(commentsTable.videoId, videoId))
      .orderBy(asc(commentsTable.createdAt));
    res.json({ comments: rows });
  },
);

router.post(
  "/portal/videos/:id/comments",
  async (req: Request, res: Response) => {
    const videoId = String(req.params.id);
    const parsed = createCommentBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid comment body" });
      return;
    }
    const [video] = await db
      .select()
      .from(videosTable)
      .where(eq(videosTable.id, videoId))
      .limit(1);
    if (!video) {
      res.status(404).json({ error: "Video not found" });
      return;
    }
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, video.projectId))
      .limit(1);
    if (
      !project ||
      (req.user!.role !== "admin" && project.clientUserId !== req.user!.id)
    ) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const [created] = await db
      .insert(commentsTable)
      .values({
        videoId,
        userId: req.user!.id,
        body: parsed.data.body,
        isApproval: parsed.data.isApproval ?? false,
      })
      .returning();
    res.status(201).json({ comment: created });
  },
);

// ----- Client uploads (reference material) -----
const registerUploadBody = z.object({
  objectPath: z.string().min(1).max(500),
  name: z.string().min(1).max(255),
  contentType: z.string().max(120).optional(),
  size: z.number().int().nonnegative().optional(),
  note: z.string().max(2000).optional(),
});

router.post(
  "/portal/projects/:id/uploads",
  async (req: Request, res: Response) => {
    const projectId = String(req.params.id);
    const parsed = registerUploadBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid upload metadata" });
      return;
    }
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .limit(1);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (
      req.user!.role !== "admin" &&
      project.clientUserId !== req.user!.id
    ) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const normalized = storage.normalizeObjectEntityPath(parsed.data.objectPath);
    await storage.trySetObjectEntityAclPolicy(parsed.data.objectPath, {
      owner: req.user!.id,
      visibility: "private",
    });
    const [created] = await db
      .insert(clientUploadsTable)
      .values({
        projectId,
        userId: req.user!.id,
        objectPath: normalized,
        name: parsed.data.name,
        contentType: parsed.data.contentType,
        size: parsed.data.size,
        note: parsed.data.note,
      })
      .returning();
    res.status(201).json({ upload: created });
  },
);

router.get(
  "/portal/projects/:id/uploads",
  async (req: Request, res: Response) => {
    const projectId = String(req.params.id);
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .limit(1);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (
      req.user!.role !== "admin" &&
      project.clientUserId !== req.user!.id
    ) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const rows = await db
      .select({
        id: clientUploadsTable.id,
        objectPath: clientUploadsTable.objectPath,
        name: clientUploadsTable.name,
        contentType: clientUploadsTable.contentType,
        size: clientUploadsTable.size,
        note: clientUploadsTable.note,
        createdAt: clientUploadsTable.createdAt,
        userId: clientUploadsTable.userId,
        userName: usersTable.name,
        userEmail: usersTable.email,
      })
      .from(clientUploadsTable)
      .innerJoin(usersTable, eq(usersTable.id, clientUploadsTable.userId))
      .where(eq(clientUploadsTable.projectId, projectId))
      .orderBy(desc(clientUploadsTable.createdAt));
    res.json({ uploads: rows });
  },
);

export default router;
