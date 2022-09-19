import app from "../src/index";
import supertest from "supertest";
import client from "../src/databases/database";
import userFactory from "./factories/userFactory";
import { tokenFactory } from "./factories/tokenFactory";
import testFactory from "./factories/testFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
  await client.$executeRaw`TRUNCATE TABLE "categories" CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE "tests" CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE "disciplines" CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE "terms" CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE "teachers" CASCADE`;
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
});

describe("Testa a rota POST /signin", () => {
  it("Deve retornar 200, se usuario logado corretamente e retorna um token", async () => {
    const userRegister = await userFactory.registerUser();
    const user = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    const result = await supertest(app).post(`/signin`).send({
      email: user.email,
      password: user.password,
    });

    const token = await tokenFactory(user.id);
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
});

describe("Testa a rota de criar novas provas POST /tests", () => {
  it("Deve retornar 201, se criar prova sucesso", async () => {
    const userRegister = await userFactory.registerUser();

    await supertest(app).post(`/signup`).send(userRegister);
    const user = await userFactory.createLogin(
      userRegister.email,
      userRegister.password
    );

    await supertest(app).post(`/signin`).send({
      email: user.email,
      password: user.password,
    });
    await supertest(app).post(`/signin`).send(user);
    const token = await tokenFactory(user.id);
    const testData = await testFactory.createTest(1, 1);

    const result = await supertest(app)
      .post(`/test/create`)
      .send(testData)
      .set(`Authorization`, `Bearer ${token}`);
    const testCreate = await client.test.findFirst({
      where: { name: testData.name },
    });
    expect(result.status).toBe(201);
    expect(testCreate).not.toBeNull();
  });
});
