import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService";

export async function getAllDisciplines(req: Request, res: Response) {
  const disciplines = await disciplineService.getAllDisciplines();
  res.status(200).send(disciplines);
}
