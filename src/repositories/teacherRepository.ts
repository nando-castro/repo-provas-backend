import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.teacher.findUnique({ where: { id } });
  return rows;
}

export async function findAll() {
  const rows = await client.teacher.findMany();
  return rows;
}

export async function findByDiscipline(disciplineId: number) {
  const rows = await client.teacherDiscipline.findMany({
    where: {
      disciplineId,
    },
    select: {
      Teacher: true,
    },
  });
  return rows;
}
