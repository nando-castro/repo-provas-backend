import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as testController from "../controllers/testController";
import { testSchema } from "../schemas/testSchema";
import { ensureAuthenticatedMiddleware } from "../middlewares/authValidateMiddleware";

const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post(
  "/test/create",
  schemaValidateMiddleware(testSchema),
  testController.createTest
);
testRouter.get("/test/view", testController.getAllTestByTeacherOrDiscipline);

export { testRouter };
