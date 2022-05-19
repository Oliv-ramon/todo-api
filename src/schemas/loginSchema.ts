import Joi from "joi";
import { UserData } from "../repositories/userRepository";

const loginSchema = Joi.object<UserData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default loginSchema;
