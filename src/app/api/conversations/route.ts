import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Create a new coversations
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: "Unothorized Access",
        },
        {
          status: 401,
        },
      );
    }
    const { title } = await req.json();
    const conversation = await db.conversations.create({
      data: {
        title: title || "New conversation",
        userId: session.user.id,
      },
    });
    return NextResponse.json(conversation);
  } catch (error) {
    console.log("[CONVERSATAIONS ERROR]", error);
    return NextResponse.json(
      {
        error: "Something Went Wrong",
      },
      {
        status: 500,
      },
    );
  }
}
