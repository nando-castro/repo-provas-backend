import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.discipline.findUnique({ where: { id } });
  return rows;
}

export async function findAll() {
  const rows = await client.discipline.findMany();
  return rows;
}

export async function findTestByDiscipline() {
  const rows = await client.teacherDiscipline.findMany({
    include: {
      Discipline: {},
      Teacher: {},
      Test: {
        include: {
          Category: {},
        },
      },
    },
  });
  return rows;
}
