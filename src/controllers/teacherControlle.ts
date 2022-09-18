import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";

export async function getAllTeachers(req: Request, res: Response) {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).send(teachers);
}
