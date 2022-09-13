import { unprocessableEntity } from "./../utils/errorUtils";
import jwt from "jsonwebtoken";
import { TypeUserData } from "./../types/UserTypes";
import * as authRepository from "../repositories/authRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils";
import bcrypt from "bcrypt";

export async function registerUser(data: TypeUserData) {
  const userExists = await authRepository.findByEmail(data.email);
  if (userExists) {
    throw conflictError(`User already registered`);
  }

  if (data.password !== data.passwordConfirm)
    throw unprocessableEntity(`Passwords not equals`);

  const NUM_CRYPT = Number(process.env.NUM_CRYPT);
  const passcrypt = bcrypt.hashSync(data.password, NUM_CRYPT);
  const dataUser = {
    email: data.email,
    password: passcrypt,
  } as TypeUserData;
  await authRepository.insert(dataUser);
}
export async function loginUser(data: TypeUserData) {
  const userExists = await authRepository.findByEmail(data.email);
  if (!userExists) {
    throw notFoundError(`User not registered`);
  }
  const comparePassword = bcrypt.compare(data.password, userExists.password);
  if (!comparePassword) {
    throw unauthorizedError(`Email or password incorrect`);
  }

  const token = jwt.sign(
    { userId: userExists.id },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  return token;
}

export async function findUserById(userId: number) {
  const user = await authRepository.findById(userId);
  if (!user) throw notFoundError("User not found");

  return user;
}
