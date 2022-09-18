import { Router } from "express";
import { disciplineRouter } from "./disciplineRouter";
import { teacherRouter } from "./teacherRouter";
import { testRouter } from "./testRouter";
import { authRouter } from "./userRouter";
const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(disciplineRouter);
router.use(teacherRouter);

export default router;
