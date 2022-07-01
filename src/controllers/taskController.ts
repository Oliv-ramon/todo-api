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
  const { userId } = res.locals;

  const tasks = await taskService.getAll(req.query, userId);

  res.status(200).send(tasks);
}

async function update(req: Request, res: Response) {
  const { taskId } = req.params;

  await taskService.update(Number(taskId), req.body);

  res.sendStatus(200);
}

const taskController = {
  create,
  getAll,
  update,
};

export default taskController;
