import { User } from "@prisma/client";

export interface IUser {
  id: number;
  email: string;
  password: string;
  passwordConfirm: string;
  createdAt: string;
}

export type TypeUserData = Omit<IUser, "id" | "createdAt">;
export type PartialUserData = Partial<User>;
