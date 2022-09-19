import client from "../src/databases/database";

async function main() {
  // módulos do curso
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (1)`;
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (2)`;
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (3)`;
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (4)`;
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (5)`;
  await client.$queryRaw`INSERT INTO terms ("number") VALUES (6)`;

  // tipos de provas
  await client.$queryRaw`INSERT INTO categories ("name") VALUES ('Projeto')`;
  await client.$queryRaw`INSERT INTO categories ("name") VALUES ('Prática')`;
  await client.$queryRaw`INSERT INTO categories ("name") VALUES ('Recuperação')`;

  // professores(as)
  await client.$queryRaw`INSERT INTO teachers ("name") VALUES ('Diego Pinho')`;
  await client.$queryRaw`INSERT INTO teachers ("name") VALUES ('Bruna Hamori')`;

  // disciplinas
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1)`;
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2)`;
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('React', 3)`;
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1)`;
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2)`;
  await client.$queryRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3)`;

  // professores(as) e disciplinas
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1)`;
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2)`;
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3)`;
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4)`;
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5)`;
  await client.$queryRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6)`;
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
  });
