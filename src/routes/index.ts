import { Router } from "express";
import { testRouter } from "./testRouter";
import { authRouter } from "./userRouter";
const router = Router();

router.use(authRouter);
router.use(testRouter);

export default router;
