import { TypeUserData } from "./../types/UserTypes";
import client from "../databases/database";

export async function insert(data: TypeUserData) {
  await client.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
}
export async function findByEmail(email: string) {
  const rows = await client.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  return rows;
}
export async function findById(userId: number) {
  const rows = await client.user.findUnique({ where: { id: userId } });
  return rows;
}
