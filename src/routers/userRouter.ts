import { Router } from "express";
import userController from "../controllers/userController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import signUpSchema from "../schemas/singUpSchema";

const userRouter = Router();
userRouter.post(
  "/users",
  validateSchemaMiddleware(signUpSchema),
  userController.signUp
);

export default userRouter;
