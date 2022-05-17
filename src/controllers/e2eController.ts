import { Request, Response } from "express";
import e2eService from "../services/e2eService.js";

async function truncate(_req: Request, res: Response) {
  await e2eService.truncate();

  res.sendStatus(200);
}

const e2eController = {
  truncate,
};

export default e2eController;
