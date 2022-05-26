import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import categorySchema from "../schemas/categorySchema.js";

const categoryRouter = Router();
categoryRouter.use(ensureAuthenticatedMiddleware);
categoryRouter.post(
  "/categories",
  validateSchemaMiddleware(categorySchema),
  categoryController.create
);

export default categoryRouter;
