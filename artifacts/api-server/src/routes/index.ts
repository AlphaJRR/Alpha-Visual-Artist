import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import portalRouter from "./portal";
import blogRouter from "./blog";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(blogRouter);
router.use(portalRouter);

export default router;
