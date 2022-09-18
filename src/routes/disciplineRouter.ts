import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as disciplineController from "../controllers/disciplineController";
import { testSchema } from "../schemas/testSchema";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const disciplineRouter = Router();

disciplineRouter.use(ensureAuthenticatedMiddleware);

disciplineRouter.get("/disciplines", disciplineController.getAllDisciplines);

export { disciplineRouter };
