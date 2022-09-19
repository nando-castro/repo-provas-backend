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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestByDisciplines = exports.getTestByTeachers = exports.getAllTests = exports.createTest = void 0;
const errorUtils_1 = require("./../utils/errorUtils");
const testRepository = __importStar(require("../repositories/testRepository"));
const categoryRepository = __importStar(require("../repositories/categoryRepository"));
const disciplineRepository = __importStar(require("../repositories/disciplineRepository"));
const teacherRepository = __importStar(require("../repositories/teacherRepository"));
const termRepository = __importStar(require("../repositories/termRepository"));
function createTest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { categoryId, disciplineId, teacherId } = data;
        const categoryExists = yield categoryRepository.findById(categoryId);
        const disciplineExists = yield disciplineRepository.findById(disciplineId);
        const teacherExists = yield teacherRepository.findById(teacherId);
        if (!categoryExists || !disciplineExists || !teacherExists)
            throw (0, errorUtils_1.notFoundError)(`not found category, discipline or teacher`);
        const teacherDiscipline = yield testRepository.findByTeacherDisciplineId(teacherId, disciplineId);
        if (!teacherDiscipline)
            throw (0, errorUtils_1.notFoundError)(`teacher-discipline is not valid`);
        const dataTest = {
            name: data.name,
            pdfURI: data.pdfURI,
            categoryId: data.categoryId,
            teacherDisciplineId: teacherDiscipline.id,
        };
        yield testRepository.insert(dataTest);
    });
}
exports.createTest = createTest;
function getAllTests() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield testRepository.findAll();
    });
}
exports.getAllTests = getAllTests;
function getTestByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield teacherRepository.findTestByTeacher();
        return tests;
    });
}
exports.getTestByTeachers = getTestByTeachers;
function getTestByDisciplines() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield termRepository.findTestByTerm();
        return tests;
    });
}
exports.getTestByDisciplines = getTestByDisciplines;
//# sourceMappingURL=testService.js.map