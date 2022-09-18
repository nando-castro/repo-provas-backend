import { Router } from "express";
import * as teacherController from "../controllers/teacherController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const teacherRouter = Router();

teacherRouter.use(ensureAuthenticatedMiddleware);

teacherRouter.get("/teachers", teacherController.getAllTeachers);
teacherRouter.get("/teachers/:id", teacherController.getTeacherByDiscipline);

export { teacherRouter };
