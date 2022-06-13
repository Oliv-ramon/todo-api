import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import createTaskSchema from "../schemas/createTaskSchema.js";

const taskRouter = Router();
taskRouter.post(
  "/tasks",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createTaskSchema),
  categoryController.create
);

taskRouter.get(
  "/tasks",
  ensureAuthenticatedMiddleware,
  categoryController.getAll
);

export default taskRouter;
