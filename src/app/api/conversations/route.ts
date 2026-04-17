import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Create a new coversations
export async function POST(req: Request) {
  try {
    const session = await auth;
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
