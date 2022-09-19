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
const index_1 = __importDefault(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../src/databases/database"));
const userFactory_1 = __importDefault(require("./factories/userFactory"));
const testFactory_1 = __importDefault(require("./factories/testFactory"));
let token;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$executeRaw `TRUNCATE TABLE "users"`;
    yield database_1.default.$executeRaw `TRUNCATE TABLE "tests" CASCADE`;
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
describe("Testa a rota POST /signup", () => {
    it("Deve retornar 201, se cadastrado um usuario no formato correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const createUser = yield database_1.default.user.findUnique({
            where: { email: userRegister.email },
        });
        expect(result.status).toBe(201);
        expect(createUser).not.toBeNull();
    }));
    it("Deve retornar 409, ao tentar cadastrar um email que ja exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        expect(result.status).toBe(409);
    }));
    it("Deve retornar 422, ao tentar cadastrar um email com senhas distintas", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        const userDataRegister = Object.assign(Object.assign({}, userRegister), { passwordConfirm: "test123" });
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userDataRegister);
        expect(result.status).toBe(422);
    }));
});
describe("Testa a rota POST /signin", () => {
    it("Deve retornar 200, se usuario logado corretamente e retorna um token", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = result.body.token;
        expect(result.status).toBe(200);
        expect(token).not.toBeNull();
    }));
    it("Deve retornar 404, se usuario nao existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: "test@test.com",
            password: "1234",
        };
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send(userLogin);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar 422, se usuario digitar email ou senha incorretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: "testtest.com",
            password: "12345",
        };
        const result = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send(userLogin);
        expect(result.status).toBe(422);
    }));
});
describe("Testa a rota de criar novas provas POST /tests", () => {
    it("Deve retornar 201, se criar prova sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTest();
        const result = yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        const testCreate = yield database_1.default.test.findFirst({
            where: { name: testData.name },
        });
        expect(result.status).toBe(201);
        expect(testCreate).not.toBeNull();
    }));
    it("Deve retornar 404, se criar category nao existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTestWrongCategory();
        const result = yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar 404, se professor nao existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTestWrongTeacher();
        const result = yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar 404, se combinacao professor disciplina nao existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTestWrongTeacherDiscipline();
        const result = yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(404);
    }));
});
describe("Testa a rota GET /tests", () => {
    it("Deve retornar status code 200 e todos tests agrupados por teachers", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTest();
        yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        const result = yield (0, supertest_1.default)(index_1.default)
            .get(`/test/view?group=teachers`)
            .set("Authorization", `${token}`);
        expect(result.status).toBe(200);
        expect(result.body).not.toBeNull();
    }));
    it("Deve retornar status code 200 e todos tests agrupados por disciplines", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegister = yield userFactory_1.default.registerUser();
        yield (0, supertest_1.default)(index_1.default).post(`/signup`).send(userRegister);
        const userData = yield userFactory_1.default.createLogin(userRegister.email, userRegister.password);
        const response = yield (0, supertest_1.default)(index_1.default).post(`/signin`).send({
            email: userData.email,
            password: userData.password,
        });
        token = response.body.token;
        const testData = yield testFactory_1.default.createTest();
        yield (0, supertest_1.default)(index_1.default)
            .post(`/test/create`)
            .send(testData)
            .set("Authorization", `Bearer ${token}`);
        const result = yield (0, supertest_1.default)(index_1.default)
            .get(`/test/view?group=disciplines`)
            .set("Authorization", `${token}`);
        expect(result.status).toBe(200);
        expect(result.body).not.toBeNull();
    }));
});
//# sourceMappingURL=app.test.js.map