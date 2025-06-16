import { NextResponse } from "next/server";
import { RegisterRequest, AuthResponse } from "@/app/types/auth";
import { createUser, findUserByEmail } from "@/app/utils/userStore";
import { generateToken } from "@/app/utils/jwt";

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();
    const { email, password, name } = body;

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create user
    const user = await createUser({ email, password, name });

    // Generate token
    const token = generateToken(user);

    const response: AuthResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
