import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.teacher.findUnique({ where: { id } });
  return rows;
}
