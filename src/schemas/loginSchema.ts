import { User } from "@prisma/client";

import joi from "joi";

export const loginSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
