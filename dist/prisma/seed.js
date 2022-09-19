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
const database_1 = __importDefault(require("../src/databases/database"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // módulos do curso
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (1)`;
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (2)`;
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (3)`;
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (4)`;
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (5)`;
        yield database_1.default.$queryRaw `INSERT INTO terms ("number") VALUES (6)`;
        // tipos de provas
        yield database_1.default.$queryRaw `INSERT INTO categories ("name") VALUES ('Projeto')`;
        yield database_1.default.$queryRaw `INSERT INTO categories ("name") VALUES ('Prática')`;
        yield database_1.default.$queryRaw `INSERT INTO categories ("name") VALUES ('Recuperação')`;
        // professores(as)
        yield database_1.default.$queryRaw `INSERT INTO teachers ("name") VALUES ('Diego Pinho')`;
        yield database_1.default.$queryRaw `INSERT INTO teachers ("name") VALUES ('Bruna Hamori')`;
        // disciplinas
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1)`;
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2)`;
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('React', 3)`;
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1)`;
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2)`;
        yield database_1.default.$queryRaw `INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3)`;
        // professores(as) e disciplinas
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1)`;
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2)`;
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3)`;
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4)`;
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5)`;
        yield database_1.default.$queryRaw `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6)`;
    });
}
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
//# sourceMappingURL=seed.js.map