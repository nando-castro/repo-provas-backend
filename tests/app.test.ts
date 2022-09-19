import app from "../src/index";
import supertest from "supertest";
import client from "../src/databases/database";
import registerFactory from "./factories/registerFactory";
import { tokenFactory } from "./factories/tokenFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
});

beforeAll(async () => {
  await client.$disconnect();
});

describe("Testa a rota POST /signup", () => {
  it("Deve retornar 201, se cadastrado um usuario no formato correto", async () => {
    const userRegister = await registerFactory();

    const result = await supertest(app).post(`/signup`).send(userRegister);

    const createUser = await client.user.findUnique({
      where: { email: userRegister.email },
    });

    expect(result.status).toBe(201);
    expect(createUser).not.toBeNull();
  });

  it("Deve retornar 409, ao tentar cadastrar um email que ja exista", async () => {
    const userRegister = await registerFactory();

    await supertest(app).post(`/signup`).send(userRegister);
    const result = await supertest(app).post(`/signup`).send(userRegister);

    expect(result.status).toBe(409);
  });
});

describe("Testa a rota POST /signin", () => {
  it("Deve retornar 200, se usuario logado corretamente", async () => {
    const userRegister = await registerFactory();
    await supertest(app).post(`/signup`).send(userRegister);
    const createUser = await client.user.findUnique({
      where: { email: userRegister.email },
    });
    const userLogin = {
      email: userRegister.email,
      password: userRegister.password,
    };

    const result = await supertest(app).post(`/signin`).send(userLogin);
    if (createUser) {
      const token = await tokenFactory(createUser.id);
      expect(result.status).toBe(200);
      expect(token).not.toBeNull();
    }
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
