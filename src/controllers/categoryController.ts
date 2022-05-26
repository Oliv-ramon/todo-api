import { Request, Response } from "express";
import { CategoryData } from "../repositories/categoryRepository.js";
import categoryService from "../services/categoryService.js";

async function create(req: Request, res: Response) {
  const categoryData: CategoryData = req.body;

  await categoryService.create(categoryData);

  res.sendStatus(201);
}

const categoryController = {
  create,
};

export default categoryController;
