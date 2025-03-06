import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Use edge runtime for faster response
export const dynamic = "force-dynamic"; // Always run on each request

export async function GET() {
  const now = new Date();

  return NextResponse.json({
    iso: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
    formatted: {
      local: now.toLocaleString(),
      utc: now.toUTCString(),
    },
  });
}
