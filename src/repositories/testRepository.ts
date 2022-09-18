import client from "../databases/database";
import { TypeTestDataRegister } from "../types/TestTypes";

export async function insert(test: TypeTestDataRegister) {
  await client.test.create({
    data: test,
  });
}

export async function findByCategoryId(categoryId: number) {
  const rows = await client.category.findUnique({
    where: { id: categoryId },
  });
  return rows;
}
export async function findByTeacherDisciplineId(
  teacherId: number,
  disciplineId: number
) {
  const rows = await client.teacherDiscipline.findFirst({
    where: { teacherId, disciplineId },
  });
  return rows;
}

export async function findAll() {
  const rows = await client.test.findMany({
    include: {
      Category: {},
      TeacherDiscipline: {
        include: {
          Discipline: {
            include: {
              Term: {},
            },
          },
          Teacher: {},
        },
      },
    },
  });
  return rows;
}
