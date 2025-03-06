"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white py-5 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Logo placeholder - replace with your actual logo */}
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Amplify Logo"
                width={32}
                height={32}
                className="object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%2341E2BA'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="text-slate-800 text-xl font-medium">
              Amplify<span className="text-[#41E2BA] font-bold">Deploy</span>
            </span>
          </Link>

          <div>
            {session ? (
              <div className="flex items-center gap-5">
                <span className="text-slate-600 text-sm hidden md:block">{session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-[#41E2BA] hover:bg-[#35c5a1] rounded-md transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-6 py-2.5 bg-[#41E2BA] hover:bg-[#35c5a1] text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
