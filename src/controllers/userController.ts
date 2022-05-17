import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository.js";
import userService from "../services/userService.js";

async function signUp(req: Request, res: Response) {
  const userData: UserData = req.body;
  console.log(userData);
  await userService.signUp(userData);

  res.sendStatus(201);
}

const userController = {
  signUp,
};

export default userController;
