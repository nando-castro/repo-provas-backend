import { ITest } from "./../types/TestTypes";
import joi from "joi";

export const testSchema = joi.object<ITest>({
  name: joi.string().required(),
  pdfURI: joi.string().uri().required(),
  categoryId: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required(),
});
