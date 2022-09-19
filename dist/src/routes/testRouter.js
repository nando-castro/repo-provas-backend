"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
const schemaValidateMiddleware_1 = require("../middlewares/schemaValidateMiddleware");
const testController = __importStar(require("../controllers/testController"));
const testSchema_1 = require("../schemas/testSchema");
const authValidateMiddleware_1 = require("../middlewares/authValidateMiddleware");
const testRouter = (0, express_1.Router)();
exports.testRouter = testRouter;
testRouter.use(authValidateMiddleware_1.ensureAuthenticatedMiddleware);
testRouter.post("/test/create", (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(testSchema_1.testSchema), testController.createTest);
testRouter.get("/test/view", testController.getAllTestByTeacherOrDiscipline);
//# sourceMappingURL=testRouter.js.map