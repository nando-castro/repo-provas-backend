import client from "../databases/database";

export async function findTestByTerm() {
  const rows = await client.term.findMany({
    orderBy: { number: "asc" },
    include: {
      Discipline: {
        include: {
          TeacherDiscipline: {
            where: {
              Test: {
                some: { name: {} },
              },
            },
            include: {
              Discipline: {},
              Teacher: {},
              Test: {
                include: {
                  Category: {},
                },
              },
            },
          },
          Term: {},
        },
      },
    },
  });
  return rows;
}
