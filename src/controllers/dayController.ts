import { Request, Response } from "express";
import dayService from "../services/dayService.js";

async function getAll(_req: Request, res: Response) {
  const days = await dayService.getAll();

  res.status(200).send(days);
}

const dayController = {
  getAll,
};

export default dayController;
