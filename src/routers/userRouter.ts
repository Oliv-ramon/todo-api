import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import loginSchema from "../schemas/loginSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const userRouter = Router();
userRouter.post(
  "/users",
  validateSchemaMiddleware(signUpSchema),
  userController.signUp
);

userRouter.post(
  "/users/login",
  validateSchemaMiddleware(loginSchema),
  userController.login
);

export default userRouter;
