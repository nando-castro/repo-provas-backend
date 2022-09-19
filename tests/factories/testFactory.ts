import { faker } from "@faker-js/faker";

async function createTest() {
  const testData = {
    name: faker.lorem.word(2),
    pdfURI: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
  return testData;
}

async function createTestWrongTeacher() {
  const testData = {
    name: faker.lorem.word(2),
    pdfURI: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 3,
  };
  return testData;
}

async function createTestWrongTeacherDiscipline() {
  const testData = {
    name: faker.lorem.word(2),
    pdfURI: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 2,
  };
  return testData;
}

async function createTestWrongCategory() {
  const testData = {
    name: faker.lorem.word(2),
    pdfURI: faker.internet.url(),
    categoryId: 4,
    disciplineId: 1,
    teacherId: 1,
  };
  return testData;
}

const testFactory = {
  createTest,
  createTestWrongTeacher,
  createTestWrongTeacherDiscipline,
  createTestWrongCategory,
};

export default testFactory;
