import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
// main function
export async function POST(req: Request) {
  try {
    // Get the message array from front-end
    const { messages } = await req.json();

    // validate the message
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid messages format",
        }),
        { status: 400 },
      );
    }

    // get the model message
    const ModelMessage = messages.map(
      (m: {
        role: "user" | "assistant";
        parts: {
          type: string;
          text?: string;
        }[];
      }) => {
        const content = m.parts.filter((p) => p.type === "text");

        const texts = content.map((c) => c.text ?? "");

        const joined = texts.join("");
        return { role: m.role, content: joined };
      },
    );
    console.log(ModelMessage);

    // call the groq and stream the response
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system:
        "You are a helpful, friendly assistant. Give clear and concise answers.",
      messages: ModelMessage,
    });
    // Return the stream to the frontend
    return result.toUIMessageStreamResponse();
  } catch (error) {
    // console the error
    console.error("[CHAT API ERROR]", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 },
    );
  }
}
