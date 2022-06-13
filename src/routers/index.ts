import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import dayRouter from "./dayRouter.js";
import e2eRouter from "./e2eRouter.js";
import taskRouter from "./taskRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(categoryRouter);
router.use(dayRouter);
router.use(taskRouter);

if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}

export default router;
