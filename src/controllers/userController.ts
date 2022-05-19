import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository.js";
import userService, { LoginData } from "../services/userService.js";

async function signUp(req: Request, res: Response) {
  const userData: UserData = req.body;

  await userService.signUp(userData);

  res.sendStatus(201);
}

async function login(req: Request, res: Response) {
  const loginData: LoginData = req.body;

  const auth = await userService.login(loginData);

  res.status(200).send(auth);
}

const userController = {
  signUp,
  login,
};

export default userController;
