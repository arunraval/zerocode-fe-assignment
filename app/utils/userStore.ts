import { User } from "../types/auth";
import bcrypt from "bcryptjs";

// In-memory user store (replace with database in production)
const users: User[] = [];

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    ...userData,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
