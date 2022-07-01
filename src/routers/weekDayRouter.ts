import { Router } from "express";
import weekDayController from "../controllers/weekDayController.js";

const weekDayRouter = Router();
weekDayRouter.get("/days", weekDayController.getAll);

export default weekDayRouter;
