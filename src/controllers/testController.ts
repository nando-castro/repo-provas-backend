import { Request, Response } from "express";
import * as testService from "../services/testService";
import { TypeTestData } from "../types/TestTypes";

export async function createTest(req: Request, res: Response) {
  // const dataTest: {
  //   name: string;
  //   pdfURI: string;
  //   categoryId: number;
  //   disciplineId: number;
  //   teacherId: number;
  // } = req.body as TypeTestData;

  const dataTest = res.locals.test;
  await testService.createTest(dataTest);
  res.sendStatus(201);
}
