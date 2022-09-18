import { Router } from "express";
import * as teacherController from "../controllers/teacherControlle";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const teacherRouter = Router();

teacherRouter.use(ensureAuthenticatedMiddleware);

teacherRouter.get("/teachers", teacherController.getAllTeachers);

export { teacherRouter };
