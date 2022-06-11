import Joi from "joi";
import { CreateCategoryData } from "../repositories/categoryRepository";

const categorySchema = Joi.object<CreateCategoryData>({
  name: Joi.string().required(),
  color: Joi.string().required(),
  icon: Joi.string().required(),
});

export default categorySchema;
