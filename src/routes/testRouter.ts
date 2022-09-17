import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as testController from "../controllers/testController";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post(
  "/test/create",
  schemaValidateMiddleware(testSchema),
  testController.createTest
);

export { testRouter };
