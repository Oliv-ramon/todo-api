import Joi from "joi";
import { CreateTaksData } from "../repositories/taskRepository";

const createTaskSchema = Joi.object<CreateTaksData>({
  name: Joi.string().required(),
  weekDays: Joi.array().min(1).required(),
  times: Joi.number().min(1).required(),
  categoryId: Joi.number().required(),
});

export default createTaskSchema;
