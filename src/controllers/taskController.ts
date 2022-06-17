import { Request, Response } from "express";
import { CreateTaksData } from "../repositories/taskRepository.js";
import taskService from "../services/taskService.js";

async function create(req: Request, res: Response) {
  const taskData: CreateTaksData = req.body;
  const { userId } = res.locals;

  await taskService.create(taskData, userId as number);

  res.sendStatus(201);
}

async function getAll(req: Request, res: Response) {
  const { categoryId } = req.query;
  const { userId } = res.locals;

  const tasks = await taskService.getByUserIdOrCategoryId(
    Number(categoryId),
    userId
  );

  res.status(200).send(tasks);
}

const taskController = {
  create,
  getAll,
};

export default taskController;
