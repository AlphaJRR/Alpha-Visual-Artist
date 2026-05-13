import { Router, Request, Response } from "express";
import { db } from "../db/index.js";
import { postsTable, commentsTable, usersTable } from "../db/schema.js";
import { eq, desc, and, isNotNull } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { insertPostSchema, insertCommentSchema } from "../db/schema.js";

const router = Router();

// ============================================================================
// BLOG POSTS ENDPOINTS
// ============================================================================

/**
 * GET /api/blog
 * List all published blog posts (public endpoint)
 * Query params: featured=true (optional)
 */
router.get("/blog", async (req: Request, res: Response) => {
  try {
    const featured = req.query.featured === "true";

    let query = db
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
      .where(eq(postsTable.published, true))
      .orderBy(desc(postsTable.publishedAt));

    if (featured) {
      query = query.where(eq(postsTable.featured, true));
    }

    const posts = await query;

    res.json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog posts",
    });
  }
});

/**
 * GET /api/blog/:slug
 * Get a single published blog post by slug (public endpoint)
 */
router.get("/blog/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const post = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.slug, slug), eq(postsTable.published, true)))
      .limit(1);

    if (!post || post.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.json({
      success: true,
      data: post[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog post",
    });
  }
});

/**
 * POST /api/blog
 * Create a new blog post (admin only)
 */
router.post("/blog", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const validation = insertPostSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid blog post data",
        details: validation.error.flatten(),
      });
    }

    const data = {
      ...validation.data,
      authorId: req.auth.userId as string, // Clerk user ID
    };

    const newPost = await db
      .insert(postsTable)
      .values(data)
      .returning();

    res.status(201).json({
      success: true,
      data: newPost[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to create blog post",
    });
  }
});

/**
 * PUT /api/blog/:postId
 * Update a blog post (admin only)
 */
router.put(
  "/blog/:postId",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;

      const validation = insertPostSchema.partial().safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid blog post data",
          details: validation.error.flatten(),
        });
      }

      const updated = await db
        .update(postsTable)
        .set({
          ...validation.data,
          updatedAt: new Date(),
        })
        .where(eq(postsTable.id, postId))
        .returning();

      if (!updated || updated.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Post not found",
        });
      }

      res.json({
        success: true,
        data: updated[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Failed to update blog post",
      });
    }
  },
);

/**
 * DELETE /api/blog/:postId
 * Delete a blog post (admin only)
 */
router.delete(
  "/blog/:postId",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;

      const deleted = await db
        .delete(postsTable)
        .where(eq(postsTable.id, postId))
        .returning();

      if (!deleted || deleted.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Post not found",
        });
      }

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Failed to delete blog post",
      });
    }
  },
);

// ============================================================================
// COMMENTS ON POSTS ENDPOINTS
// ============================================================================

/**
 * GET /api/blog/:postId/comments
 * Get all comments for a blog post (public endpoint)
 */
router.get("/blog/:postId/comments", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await db
      .select({
        id: commentsTable.id,
        body: commentsTable.body,
        userId: commentsTable.userId,
        userName: usersTable.name,
        userEmail: usersTable.email,
        createdAt: commentsTable.createdAt,
      })
      .from(commentsTable)
      .leftJoin(usersTable, eq(commentsTable.userId, usersTable.id))
      .where(eq(commentsTable.postId, postId))
      .orderBy(desc(commentsTable.createdAt));

    res.json({
      success: true,
      data: comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch comments",
    });
  }
});

/**
 * POST /api/blog/:postId/comments
 * Create a comment on a blog post (authenticated users only)
 */
router.post(
  "/blog/:postId/comments",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { body } = req.body;

      if (!body || body.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "Comment body is required",
        });
      }

      // Get user ID from Clerk
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkUserId, req.auth.userId as string))
        .limit(1);

      if (!user || user.length === 0) {
        return res.status(401).json({
          success: false,
          error: "User not found",
        });
      }

      const newComment = await db
        .insert(commentsTable)
        .values({
          postId,
          userId: user[0].id,
          body: body.trim(),
          isApproval: false,
        })
        .returning();

      res.status(201).json({
        success: true,
        data: newComment[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Failed to create comment",
      });
    }
  },
);

/**
 * DELETE /api/comments/:commentId
 * Delete a comment (admin or comment author only)
 */
router.delete(
  "/comments/:commentId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;

      // Get comment
      const comment = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);

      if (!comment || comment.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Comment not found",
        });
      }

      // Get user
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkUserId, req.auth.userId as string))
        .limit(1);

      if (!user || user.length === 0) {
        return res.status(401).json({
          success: false,
          error: "User not found",
        });
      }

      // Check if user is admin or comment author
      if (user[0].role !== "admin" && comment[0].userId !== user[0].id) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to delete this comment",
        });
      }

      const deleted = await db
        .delete(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .returning();

      res.json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Failed to delete comment",
      });
    }
  },
);

export default router;
