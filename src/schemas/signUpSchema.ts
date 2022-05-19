import Joi from "joi";
import { UserData } from "../repositories/userRepository";

const signUpSchema = Joi.object<UserData>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default signUpSchema;
