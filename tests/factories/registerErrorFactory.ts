import { faker } from "@faker-js/faker";

export default async function registerErrorFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirm: faker.internet.password(),
  };
}
