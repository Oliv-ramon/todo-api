import { Request, Response } from "express";
import eventService from "../services/eventService.js";

async function check(req: Request, res: Response) {
  const { eventId } = req.params;

  await eventService.checkOrUncheck(Number(eventId));

  res.sendStatus(200);
}

const eventControler = {
  check,
};

export default eventControler;
