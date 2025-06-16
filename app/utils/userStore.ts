import { User } from "../types/auth";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

if (!fs.existsSync(path.dirname(USERS_FILE))) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

const getUsers = (): User[] => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const saveUsers = (users: User[]) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    ...userData,
    password: hashedPassword,
  };

  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
