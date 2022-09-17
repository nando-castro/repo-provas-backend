import { Test } from "@prisma/client";

export interface ITest {
  id: number;
  name: string;
  pdfURI: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
  teacherDisciplineId: number;
  createdAt: string;
}

export type TypeTestData = Omit<
  ITest,
  "id" | "teacherDiscipline" | "createdAt"
>;
export type TypeTestDataRegister = Omit<
  ITest,
  "id" | "teacherId" | "disciplineId" | "createdAt"
>;
export type PartialTestData = Partial<Test>;
