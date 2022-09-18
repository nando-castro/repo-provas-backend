import * as disciplineRepository from "../repositories/disciplineRepository";

export async function getAllDisciplines() {
  const disciplines = await disciplineRepository.findAll();
  return disciplines;
}
