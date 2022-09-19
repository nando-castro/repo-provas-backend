import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const categoryRouter = Router();

categoryRouter.use(ensureAuthenticatedMiddleware);

categoryRouter.get("/categories", categoryController.getAllCategories);

export { categoryRouter };
