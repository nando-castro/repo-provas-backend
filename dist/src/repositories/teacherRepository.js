"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTestByTeacher = exports.findByDiscipline = exports.findAll = exports.findById = void 0;
const database_1 = __importDefault(require("../databases/database"));
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.teacher.findUnique({ where: { id } });
        return rows;
    });
}
exports.findById = findById;
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.teacher.findMany();
        return rows;
    });
}
exports.findAll = findAll;
function findByDiscipline(disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.teacherDiscipline.findMany({
            where: {
                disciplineId,
            },
            select: {
                Teacher: true,
            },
        });
        return rows;
    });
}
exports.findByDiscipline = findByDiscipline;
function findTestByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.teacherDiscipline.findMany({
            include: {
                Teacher: {},
                Discipline: {},
                Test: {
                    include: {
                        Category: {},
                    },
                },
            },
        });
        return rows;
    });
}
exports.findTestByTeacher = findTestByTeacher;
//# sourceMappingURL=teacherRepository.js.map