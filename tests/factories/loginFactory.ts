export async function loginFactory(email: string, password: string) {
  return {
    email,
    password,
  };
}
