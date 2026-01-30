export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(?!^\d+@)[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.(com|in|net|org|io|co|edu)$/i;

  return regex.test(email.trim());
};
export const sanitizePassword = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};
export const isValidPassword = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9]{8}$/;
  return regex.test(password);
};
