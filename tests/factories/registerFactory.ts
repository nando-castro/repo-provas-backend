import { faker } from "@faker-js/faker";

export default async function registerFactory() {
  const passwordFaker = faker.internet.password();

  return {
    email: faker.internet.email(),
    password: passwordFaker,
    passwordConfirm: passwordFaker,
  };
}