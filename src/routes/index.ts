import { Router } from "express";
import { authRouter } from "./userRouter";
const router = Router();

router.use(authRouter);

export default router;
