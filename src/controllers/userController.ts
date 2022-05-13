import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository";
import userService from "../services/userService";

async function signUp(req: Request, res: Response) {
  const userData: UserData = req.body;

  await userService.signUp(userData);

  res.sendStatus(201);
}

const userController = {
  signUp,
};

export default userController;
