import client from "../databases/database";

export async function findTestByTerm() {
  const rows = await client.term.findMany({
    select: {
      id: true,
      number: true,
      Discipline: {
        select: {
          id: true,
          name: true,
          Term: true,
          TeacherDiscipline: {
            select: {
              id: true,
              Discipline: { select: { id: true, name: true } },
              Teacher: { select: { id: true, name: true } },
              Test: {
                select: {
                  id: true,
                  name: true,
                  pdfURI: true,
                  Category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return rows;
}
