import { Router } from "express";
import { loginSchema } from "./../schemas/loginSchema";
import { registerSchema } from "../schemas/registerSchema";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidateMiddleware(registerSchema),
  authController.register
);

authRouter.post(
  "/signin",
  schemaValidateMiddleware(loginSchema),
  authController.login
);

export { authRouter };
