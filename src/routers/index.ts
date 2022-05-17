import { Router } from "express";
import e2eRouter from "./e2eRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);

if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}

export default router;
