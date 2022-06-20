import { Router } from "express";
import taskController from "../controllers/taskController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import createTaskSchema from "../schemas/createTaskSchema.js";

const taskRouter = Router();
taskRouter.post(
  "/tasks",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createTaskSchema),
  taskController.create
);

taskRouter.get(
  "/tasks/today",
  ensureAuthenticatedMiddleware,
  taskController.getOfToday
);

export default taskRouter;
