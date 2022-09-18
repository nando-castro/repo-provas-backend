import * as teacherRepository from "../repositories/teacherRepository";

export async function getAllTeachers() {
  const teachers = await teacherRepository.findAll();
  return teachers;
}

export async function getTeachersByDiscipline(disciplineId: number) {
  const teachers = await teacherRepository.findByDiscipline(disciplineId);
  return teachers;
}
