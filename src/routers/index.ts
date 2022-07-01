import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import weekDayRouter from "./weekDayRouter.js";
import e2eRouter from "./e2eRouter.js";
import taskRouter from "./taskRouter.js";
import userRouter from "./userRouter.js";
import eventRouter from "./eventRouter.js";

const router = Router();
router.use(userRouter);
router.use(categoryRouter);
router.use(weekDayRouter);
router.use(taskRouter);
router.use(eventRouter);

if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}

export default router;
