import { NextResponse } from "next/server";
import { initializeDatabase, getDbStatus } from "@/lib/db";

export async function GET() {
  try {
    await initializeDatabase();
    const { dbReady, dbError } = getDbStatus();

    return NextResponse.json({
      success: true,
      connected: dbReady,
      message: dbReady ? "PostgreSQL ready" : "PostgreSQL unavailable",
      error: dbError,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, connected: false, error: error.message },
      { status: 503 }
    );
  }
}
