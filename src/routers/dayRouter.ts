import { Router } from "express";
import dayController from "../controllers/dayController.js";

const daysRouter = Router();
daysRouter.get("/days", dayController.getAll);

export default daysRouter;
