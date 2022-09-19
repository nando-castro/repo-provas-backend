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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function createTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const testData = {
            name: faker_1.faker.lorem.word(2),
            pdfURI: faker_1.faker.internet.url(),
            categoryId: 1,
            disciplineId: 1,
            teacherId: 1,
        };
        return testData;
    });
}
function createTestWrongTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const testData = {
            name: faker_1.faker.lorem.word(2),
            pdfURI: faker_1.faker.internet.url(),
            categoryId: 1,
            disciplineId: 1,
            teacherId: 3,
        };
        return testData;
    });
}
function createTestWrongTeacherDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const testData = {
            name: faker_1.faker.lorem.word(2),
            pdfURI: faker_1.faker.internet.url(),
            categoryId: 1,
            disciplineId: 1,
            teacherId: 2,
        };
        return testData;
    });
}
function createTestWrongCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        const testData = {
            name: faker_1.faker.lorem.word(2),
            pdfURI: faker_1.faker.internet.url(),
            categoryId: 4,
            disciplineId: 1,
            teacherId: 1,
        };
        return testData;
    });
}
const testFactory = {
    createTest,
    createTestWrongTeacher,
    createTestWrongTeacherDiscipline,
    createTestWrongCategory,
};
exports.default = testFactory;
//# sourceMappingURL=testFactory.js.map