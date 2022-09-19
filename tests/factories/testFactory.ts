import { faker } from "@faker-js/faker";
import client from "../../src/databases/database";

async function createTest(categoryId: number, teacherDisciplineId: number) {
  const testData = await client.test.create({
    data: {
      name: faker.lorem.word(2),
      pdfURI: faker.internet.url(),
      categoryId,
      teacherDisciplineId,
    },
  });
  return testData;
}

const testFactory = {
  createTest,
};

export default testFactory;
