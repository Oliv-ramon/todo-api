import { Request, Response } from "express";
import weekDayService from "../services/weekDayService.js";

async function getAll(_req: Request, res: Response) {
  const days = await weekDayService.getAll();

  res.status(200).send(days);
}

const weekDayController = {
  getAll,
};

export default weekDayController;
