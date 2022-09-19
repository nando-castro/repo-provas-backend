import { Request, Response } from "express";
import * as testService from "../services/testService";
import { TypeTestData } from "../types/TestTypes";

export async function createTest(req: Request, res: Response) {
  const dataTest = res.locals.test;
  await testService.createTest(dataTest);
  res.sendStatus(201);
}

export async function getAllTestByTeacherOrDiscipline(
  req: Request,
  res: Response
) {
  const { group } = req.query;
  if (group === "teachers") {
    const tests = await testService.getTestByTeachers();
    return res.status(200).send({ tests });
  }
  if (group === "disciplines") {
    const tests = await testService.getTestByDisciplines();
    return res.status(200).send({ tests });
  }
  const tests = await testService.getAllTests();
  res.status(200).send(tests);
}
