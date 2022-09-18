import { notFoundError } from "./../utils/errorUtils";
import { TypeTestData } from "./../types/TestTypes";
import * as testRepository from "../repositories/testRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as disciplineRepository from "../repositories/disciplineRepository";
import * as teacherRepository from "../repositories/teacherRepository";

export async function createTest(data: TypeTestData) {
  const { categoryId, disciplineId, teacherId } = data;
  const categoryExists = await categoryRepository.findById(categoryId);
  const disciplineExists = await disciplineRepository.findById(disciplineId);
  const teacherExists = await teacherRepository.findById(teacherId);

  if (!categoryExists || !disciplineExists || !teacherExists)
    throw notFoundError(`not found category, discipline or teacher`);

  const teacherDiscipline = await testRepository.findByTeacherDisciplineId(
    teacherId,
    disciplineId
  );

  if (!teacherDiscipline)
    throw notFoundError(`teacher-discipline is not valid`);

  const dataTest = {
    name: data.name,
    pdfURI: data.pdfURI,
    categoryId: data.categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  };

  await testRepository.insert(dataTest);
}

export async function getAllTests() {
  return await testRepository.findAll();
}
