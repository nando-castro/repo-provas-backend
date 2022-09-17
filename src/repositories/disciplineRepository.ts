import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.discipline.findUnique({ where: { id } });
  return rows;
}
