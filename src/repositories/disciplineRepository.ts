import client from "../databases/database";

export async function findById(id: number) {
  const rows = await client.discipline.findUnique({ where: { id } });
  return rows;
}

export async function findAll() {
  const rows = await client.discipline.findMany();
  return rows;
}
