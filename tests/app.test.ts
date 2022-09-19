import app from "../src/index";
import supertest from "supertest";
import client from "../src/databases/database";
import userFactory from "./factories/userFactory";
import testFactory from "./factories/testFactory";

let token: string;

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
  await client.$executeRaw`TRUNCATE TABLE "tests" CASCADE`;
});

beforeAll(async () => {
  await client.$disconnect();
});

describe("Testa a rota POST /signup", () => {
  it("Deve retornar 201, se cadastrado um usuario no formato correto", async () => {
    const userRegister = await userFactory.registerUser();

    const result = await supertest(app).post(`/signup`).send(userRegister);

    const createUser = await client.user.findUnique({
      where: { email: userRegister.email },
    });

    expect(result.status).toBe(201);
    expect(createUser).not.toBeNull();
  });

  it("Deve retornar 409, ao tentar cadastrar um email que ja exista", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const result = await supertest(app).post(`/signup`).send(userRegister);

    expect(result.status).toBe(409);
  });
  it("Deve retornar 422, ao tentar cadastrar um email com senhas distintas", async () => {
    const userRegister = await userFactory.registerUser();
    const userDataRegister = { ...userRegister, passwordConfirm: "test123" };

    const result = await supertest(app).post(`/signup`).send(userDataRegister);

    expect(result.status).toBe(422);
  });
});

describe("Testa a rota POST /signin", () => {
  it("Deve retornar 200, se usuario logado corretamente e retorna um token", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = result.body.token;
    expect(result.status).toBe(200);
    expect(token).not.toBeNull();
  });
  it("Deve retornar 404, se usuario nao existir", async () => {
    const userLogin = {
      email: "test@test.com",
      password: "1234",
    };
    const result = await supertest(app).post(`/signin`).send(userLogin);
    expect(result.status).toBe(404);
  });
  it("Deve retornar 422, se usuario digitar email ou senha incorretos", async () => {
    const userLogin = {
      email: "testtest.com",
      password: "12345",
    };
    const result = await supertest(app).post(`/signin`).send(userLogin);
    expect(result.status).toBe(422);
  });
});

describe("Testa a rota de criar novas provas POST /tests", () => {
  it("Deve retornar 201, se criar prova sucesso", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTest();

    const result = await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    const testCreate = await client.test.findFirst({
      where: { name: testData.name },
    });
    expect(result.status).toBe(201);
    expect(testCreate).not.toBeNull();
  });
  it("Deve retornar 404, se criar category nao existir", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTestWrongCategory();

    const result = await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(404);
  });
  it("Deve retornar 404, se professor nao existir", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTestWrongTeacher();

    const result = await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(404);
  });
  it("Deve retornar 404, se combinacao professor disciplina nao existir", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTestWrongTeacherDiscipline();

    const result = await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(404);
  });
});
describe("Testa a rota GET /tests", () => {
  it("Deve retornar status code 200 e todos tests agrupados por teachers", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTest();

    await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);

    const result = await supertest(app)
      .get(`/test/view?group=teachers`)
      .set("Authorization", `${token}`);
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });
  it("Deve retornar status code 200 e todos tests agrupados por disciplines", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const userData = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const response = await supertest(app).post(`/signin`).send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
    const testData = await testFactory.createTest();

    await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set("Authorization", `Bearer ${token}`);

    const result = await supertest(app)
      .get(`/test/view?group=disciplines`)
      .set("Authorization", `${token}`);
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });
});
