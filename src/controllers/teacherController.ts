import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";

export async function getAllTeachers(req: Request, res: Response) {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).send(teachers);
}

export async function getTeacherByDiscipline(req: Request, res: Response) {
  const { id } = req.params;
  const teachers = await teacherService.getTeachersByDiscipline(Number(id));
  res.status(200).send(teachers);
}
