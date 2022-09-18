import * as teacherRepository from "../repositories/teacherRepository";

export async function getAllTeachers() {
  const teachers = await teacherRepository.findAll();
  return teachers;
}
