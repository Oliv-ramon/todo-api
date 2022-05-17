import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/singUpSchema.js";

const userRouter = Router();
userRouter.post(
  "/users",
  validateSchemaMiddleware(signUpSchema),
  userController.signUp
);

export default userRouter;
