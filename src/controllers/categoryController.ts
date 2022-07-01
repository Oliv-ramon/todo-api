import { Request, Response } from "express";
import { CreateCategoryData } from "../repositories/categoryRepository.js";
import categoryService from "../services/categoryService.js";

async function create(req: Request, res: Response) {
  const categoryData: CreateCategoryData = req.body;
  const { userId } = res.locals;

  await categoryService.create(categoryData, userId);

  res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const { userId } = res.locals;

  const categories = await categoryService.getAll(userId);

  res.status(200).send(categories);
}

async function getTodays(_req: Request, res: Response) {
  const { userId } = res.locals;

  const categories = await categoryService.getTodays(userId);

  res.status(200).send(categories);
}

const categoryController = {
  create,
  getAll,
  getTodays,
};

export default categoryController;
