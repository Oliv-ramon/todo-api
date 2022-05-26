import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import categorySchema from "../schemas/categorySchema.js";

const categoryRouter = Router();
categoryRouter.post(
  "/categories",
  validateSchemaMiddleware(categorySchema),
  categoryController.create
);

export default categoryRouter;
