"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  // Local state for form values and submission status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Call NextAuth's signIn with our custom "mode" (i.e. "signup")
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        mode: "signup",
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          "Registration successful! Please check your email for confirmation.");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-16 h-16 mx-auto">
              <Image
                src="/logo.png"
                alt="Amplify Logo"
                fill
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='%2341E2BA'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-slate-800">
            Create Account
          </h2>
          <p className="mt-2 text-slate-600">
            Sign up to get started
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
            noValidate
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#41E2BA] focus:border-[#41E2BA]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#41E2BA] focus:border-[#41E2BA]"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors duration-300 ${isSubmitting
                  ? "bg-[#41E2BA]/70 cursor-not-allowed"
                  : "bg-[#41E2BA] hover:bg-[#35c5a1]"
                  }`}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-[#41E2BA] hover:text-[#35c5a1] relative after:absolute after:bg-[#41E2BA] after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
