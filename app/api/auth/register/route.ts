import { NextResponse } from "next/server";
import { RegisterRequest, AuthResponse } from "@/app/types/auth";
import { createUser } from "@/app/utils/userStore";
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

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
