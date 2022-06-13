import Joi from "joi";
import { CreateTaksData } from "../repositories/taskRepository";

const createTaskSchema = Joi.object<CreateTaksData>({
  name: Joi.string().required(),
  days: Joi.array().min(1).required(),
  categoryId: Joi.number().required(),
});

export default createTaskSchema;
