"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin after 3 seconds
    const timer = setTimeout(() => router.push("/auth/signin"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Authentication Error
        </h1>
        <p className="text-gray-600">
          An unexpected error occurred. Redirecting to login...
        </p>
      </div>
    </div>
  );
}
