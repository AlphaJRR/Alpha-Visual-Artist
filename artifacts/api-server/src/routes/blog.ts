import { Router, type IRouter, type Request, type Response } from "express";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod/v4";
import { db, postsTable, commentsTable, usersTable } from "@workspace/db";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const insertPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1),
  coverImagePath: z.string().nullable().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

const router: IRouter = Router();

router.get("/blog", async (req: Request, res: Response): Promise<void> => {
  try {
    const featured = req.query.featured === "true";

    const where = featured
      ? and(eq(postsTable.published, true), eq(postsTable.featured, true))
      : eq(postsTable.published, true);

    const posts = await db
      .select({
        id: postsTable.id,
        slug: postsTable.slug,
        title: postsTable.title,
        excerpt: postsTable.excerpt,
        coverImagePath: postsTable.coverImagePath,
        authorId: postsTable.authorId,
        featured: postsTable.featured,
        publishedAt: postsTable.publishedAt,
        createdAt: postsTable.createdAt,
      })
      .from(postsTable)
      .where(where)
      .orderBy(desc(postsTable.publishedAt));

    res.json({ success: true, data: posts });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch blog posts");
    res.status(500).json({ success: false, error: "Failed to fetch blog posts" });
  }
});

router.get("/blog/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = String(req.params.slug);
    const post = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.slug, slug), eq(postsTable.published, true)))
      .limit(1);

    if (!post || post.length === 0) {
      res.status(404).json({ success: false, error: "Post not found" });
      return;
    }
    res.json({ success: true, data: post[0] });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch blog post");
    res.status(500).json({ success: false, error: "Failed to fetch blog post" });
  }
});

router.post(
  "/blog",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = insertPostSchema.safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: "Invalid blog post data",
          details: validation.error.flatten(),
        });
        return;
      }

      const newPost = await db
        .insert(postsTable)
        .values({ ...validation.data, authorId: req.user!.id })
        .returning();

      res.status(201).json({ success: true, data: newPost[0] });
    } catch (err) {
      req.log.error({ err }, "Failed to create blog post");
      res.status(500).json({ success: false, error: "Failed to create blog post" });
    }
  },
);

router.put(
  "/blog/:postId",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = String(req.params.postId);
      const validation = insertPostSchema.partial().safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: "Invalid blog post data",
          details: validation.error.flatten(),
        });
        return;
      }

      const updated = await db
        .update(postsTable)
        .set({ ...validation.data, updatedAt: new Date() })
        .where(eq(postsTable.id, postId))
        .returning();

      if (!updated || updated.length === 0) {
        res.status(404).json({ success: false, error: "Post not found" });
        return;
      }
      res.json({ success: true, data: updated[0] });
    } catch (err) {
      req.log.error({ err }, "Failed to update blog post");
      res.status(500).json({ success: false, error: "Failed to update blog post" });
    }
  },
);

router.delete(
  "/blog/:postId",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = String(req.params.postId);
      const deleted = await db
        .delete(postsTable)
        .where(eq(postsTable.id, postId))
        .returning();

      if (!deleted || deleted.length === 0) {
        res.status(404).json({ success: false, error: "Post not found" });
        return;
      }
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
      req.log.error({ err }, "Failed to delete blog post");
      res.status(500).json({ success: false, error: "Failed to delete blog post" });
    }
  },
);

router.get("/blog/:postId/comments", async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = String(req.params.postId);
    const comments = await db
      .select({
        id: commentsTable.id,
        body: commentsTable.body,
        userName: usersTable.name,
        createdAt: commentsTable.createdAt,
      })
      .from(commentsTable)
      .leftJoin(usersTable, eq(commentsTable.userId, usersTable.id))
      .where(eq(commentsTable.postId, postId))
      .orderBy(desc(commentsTable.createdAt));

    res.json({ success: true, data: comments });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch comments");
    res.status(500).json({ success: false, error: "Failed to fetch comments" });
  }
});

router.post(
  "/blog/:postId/comments",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = String(req.params.postId);
      const { body } = req.body;
      if (!body || body.trim().length === 0) {
        res.status(400).json({ success: false, error: "Comment body is required" });
        return;
      }

      const newComment = await db
        .insert(commentsTable)
        .values({
          postId,
          userId: req.user!.id,
          body: body.trim(),
          isApproval: false,
        })
        .returning();

      res.status(201).json({ success: true, data: newComment[0] });
    } catch (err) {
      req.log.error({ err }, "Failed to create comment");
      res.status(500).json({ success: false, error: "Failed to create comment" });
    }
  },
);

router.delete(
  "/comments/:commentId",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = String(req.params.commentId);
      const comment = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);

      if (!comment || comment.length === 0) {
        res.status(404).json({ success: false, error: "Comment not found" });
        return;
      }

      const user = req.user!;
      if (user.role !== "admin" && comment[0].userId !== user.id) {
        res.status(403).json({
          success: false,
          error: "Not authorized to delete this comment",
        });
        return;
      }

      await db.delete(commentsTable).where(eq(commentsTable.id, commentId));
      res.json({ success: true, message: "Comment deleted successfully" });
    } catch (err) {
      req.log.error({ err }, "Failed to delete comment");
      res.status(500).json({ success: false, error: "Failed to delete comment" });
    }
  },
);

export default router;
