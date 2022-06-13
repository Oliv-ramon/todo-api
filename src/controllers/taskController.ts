import { Request, Response } from "express";
import { CreateTaksData } from "../repositories/taskRepository.js";
import taskService from "../services/taskService.js";

async function create(req: Request, res: Response) {
  const taskData: CreateTaksData = req.body;

  await taskService.create(taskData);

  res.sendStatus(201);
}

/* async function getAll(_req: Request, res: Response) {
  const { userId } = res.locals;

  const categories = await categoryService.getAll(userId);

  res.status(200).send(categories);
} */

const taskController = {
  create,
};

export default taskController;
