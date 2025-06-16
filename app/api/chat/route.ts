import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const message = body?.message;

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(data?.error?.message || "OpenRouter API failed");
    }

    const content = data.choices?.[0]?.message?.content || "No response.";

    return NextResponse.json({ response: content });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error from OpenRouter:", error);
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
