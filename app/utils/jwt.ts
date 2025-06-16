import jwt from "jsonwebtoken";
import { User } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (user: Omit<User, "password">): string => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
