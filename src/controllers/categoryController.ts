import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export async function getAllCategories(req: Request, res: Response) {
  const categories = await categoryService.getAllCategories();
  res.status(200).send(categories);
}
