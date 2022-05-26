import Joi from "joi";
import { CategoryData } from "../repositories/categoryRepository";

const categorySchema = Joi.object<CategoryData>({
  name: Joi.string().required(),
  color: Joi.string().required(),
  icon: Joi.string().required(),
});

export default categorySchema;
