"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const disciplineRouter_1 = require("./disciplineRouter");
const teacherRouter_1 = require("./teacherRouter");
const testRouter_1 = require("./testRouter");
const userRouter_1 = require("./userRouter");
const router = (0, express_1.Router)();
router.use(userRouter_1.authRouter);
router.use(testRouter_1.testRouter);
router.use(disciplineRouter_1.disciplineRouter);
router.use(teacherRouter_1.teacherRouter);
exports.default = router;
//# sourceMappingURL=index.js.map