import { Request, Response } from "express";
import { CreateCategoryData } from "../repositories/categoryRepository.js";
import categoryService from "../services/categoryService.js";

async function create(req: Request, res: Response) {
  const categoryData: CreateCategoryData = req.body;
  const { userId } = res.locals;

  await categoryService.create(categoryData, userId);

  res.sendStatus(201);
}

const categoryController = {
  create,
};

export default categoryController;
