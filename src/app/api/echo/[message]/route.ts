/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/lib/env";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Use edge runtime for faster response

export async function GET(request: Request, { params }: any) {
  const { message } = params;
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  return NextResponse.json({
    message,
    queryParams,
    echoed: true,
    timestamp: new Date().toISOString(),
    environment: config.NEXT_PUBLIC_ENVIRONMENT,
  });
}
