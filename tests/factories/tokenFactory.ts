import jwt from "jsonwebtoken";

export async function tokenFactory(userId: number) {
  return jwt.sign({ userId }, `${process.env.JWT_SECRET}`);
}
