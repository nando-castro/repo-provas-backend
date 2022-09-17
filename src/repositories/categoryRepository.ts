import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.category.findUnique({ where: { id } });
  return rows;
}
