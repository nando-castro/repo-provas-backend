import app from "../src/index";
import supertest from "supertest";
import client from "../src/databases/database";
import registerFactory from "./factories/registerFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
});

beforeAll(async () => {
  await client.$disconnect();
});

describe("Testa a rota POST /signup", () => {
  it("Deve retornar 201, se cadastrado um item no formato correto", async () => {
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
