import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the current timestamp
  const startTime = Date.now();

  // Extract useful information from the request
  const { method, nextUrl } = request;
  const referer = request.headers.get("referer") || "none";
  const userAgent = request.headers.get("user-agent") || "unknown";

  // Create a simple log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    method,
    path: nextUrl.pathname,
    query: Object.fromEntries(nextUrl.searchParams.entries()),
    referer,
    userAgent: userAgent.substring(0, 100), // Truncate long user agents
  };

  // Log the request (you could store this in a database in production)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Middleware] ${JSON.stringify(logEntry)}`);
  }

  // Continue with the request without modification
  const response = NextResponse.next();

  // Add a custom header to track middleware processing
  response.headers.set("X-Middleware-Processed", "true");

  // Log response time in development
  if (process.env.NODE_ENV === "development") {
    const duration = Date.now() - startTime;
    console.log(
      `[Middleware] Request to ${nextUrl.pathname} completed in ${duration}ms`
    );
  }

  return response;
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: [
    // Apply to all routes except static files, API routes, and _next routes
    // This pattern covers most frontend pages while excluding things like images, API calls, etc.
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
