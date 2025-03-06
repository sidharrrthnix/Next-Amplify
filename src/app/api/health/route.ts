import { config } from "@/lib/env";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Always run on each request

export async function GET() {
  try {
    // You could add additional health checks here
    return NextResponse.json(
      {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        supabaseConnected: !!config.NEXT_PUBLIC_SUPABASE_URL,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Service health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
