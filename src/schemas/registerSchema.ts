import { IUser } from "../types/UserTypes";
import joi from "joi";

export const registerSchema = joi.object<IUser>({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
  passwordConfirm: joi.string().min(1).required(),
});
