import { Router } from "express";
import * as disciplineController from "../controllers/disciplineController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const disciplineRouter = Router();

disciplineRouter.use(ensureAuthenticatedMiddleware);

disciplineRouter.get("/disciplines", disciplineController.getAllDisciplines);

export { disciplineRouter };
