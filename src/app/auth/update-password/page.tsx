"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const rToken = params.get("refresh_token");

      if (token && rToken) {
        setAccessToken(token);
        setRefreshToken(rToken);
      } else {
        toast.error("Missing tokens in URL.");
      }
    }
  }, []);

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (!accessToken || !refreshToken) {
      toast.error("Missing tokens.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
          access_token: accessToken,
          refresh_token: refreshToken,
        }),
      });
      const result = await res.json();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Password updated successfully.");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            Set New Password
          </h2>
          <p className="mt-2 text-slate-600">
            Create a new secure password for your account
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form
            onSubmit={handleUpdatePassword}
            noValidate
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-slate-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#41E2BA] focus:border-[#41E2BA]"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
                {isSubmitting ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
