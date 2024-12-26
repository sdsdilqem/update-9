import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};