import { faker } from "@faker-js/faker";
import client from "../../src/databases/database";

export async function testFactory(
  categoryId: number,
  teacherDisciplineId: number
) {
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
