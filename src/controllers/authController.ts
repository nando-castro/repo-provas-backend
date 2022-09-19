import { TypeUserData } from "./../types/UserTypes";
import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  const dataUser: { email: string; password: string; passwordConfirm: string } =
    req.body as TypeUserData;
  await authService.registerUser(dataUser);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const userData: TypeUserData = req.body;
  const token: string = await authService.loginUser(userData);
  res.status(200).send({ token });
}
