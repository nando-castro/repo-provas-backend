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
exports.findAll = exports.findByTeacherDisciplineId = exports.findByCategoryId = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(test) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.test.create({
            data: test,
        });
    });
}
exports.insert = insert;
function findByCategoryId(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.category.findUnique({
            where: { id: categoryId },
        });
        return rows;
    });
}
exports.findByCategoryId = findByCategoryId;
function findByTeacherDisciplineId(teacherId, disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.teacherDiscipline.findFirst({
            where: { teacherId, disciplineId },
        });
        return rows;
    });
}
exports.findByTeacherDisciplineId = findByTeacherDisciplineId;
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.test.findMany({
            include: {
                Category: {},
                TeacherDiscipline: {
                    include: {
                        Discipline: {
                            include: {
                                Term: {},
                            },
                        },
                        Teacher: {},
                    },
                },
            },
        });
        return rows;
    });
}
exports.findAll = findAll;
//# sourceMappingURL=testRepository.js.map