import * as categoryRepository from "../repositories/categoryRepository";

export async function getAllCategories() {
  const disciplines = await categoryRepository.findAll();
  return disciplines;
}
