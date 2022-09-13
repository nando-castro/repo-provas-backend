import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const result = bcrypt.hashSync(password, 10);
  return result;
};

export const comparePassword = (password: string, passwordCompare: string) => {
  const result = bcrypt.compare(password, passwordCompare);
  return result;
};
