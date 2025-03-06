import { config } from '@/lib/env';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Image
            src="/logo.png"
            alt="AWS Amplify Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          {config.NEXT_PUBLIC_APP_NAME}
        </h1>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signin"
            className="px-6 py-3 rounded-md bg-[#41E2BA] text-white font-medium hover:bg-[#35c5a1] transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-md border border-[#41E2BA] text-[#41E2BA] font-medium hover:bg-[#41E2BA]/10 transition-all duration-300"
          >
            View Docs
          </Link>
        </div>
        <div className="mt-4 bg-slate-100 inline-block px-3 py-1 rounded text-sm text-slate-600">
          Environment: {config.NEXT_PUBLIC_ENVIRONMENT}
        </div>
      </section>

      {/* Rendering Examples Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Rendering Strategies
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* SSR Component Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Server-Side Rendering (SSR)
              </h3>
              <p className="text-slate-600 mb-6">
                Data fetched on each request. Good for pages that need fresh data.
              </p>
              <Link
                href="/ssr"
                className="block w-full py-3 px-4 bg-[#41E2BA] text-white text-center rounded-md hover:bg-[#35c5a1] transition-colors"
              >
                View SSR Example
              </Link>
            </div>

            {/* SSG Component Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Static Site Generation (SSG)
              </h3>
              <p className="text-slate-600 mb-6">
                Generated at build time. Great for content that doesn&apos;t change often.
              </p>
              <Link
                href="/ssg"
                className="block w-full py-3 px-4 bg-[#41E2BA] text-white text-center rounded-md hover:bg-[#35c5a1] transition-colors"
              >
                View SSG Example
              </Link>
            </div>

            {/* ISR Component Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Incremental Static Regeneration (ISR)
              </h3>
              <p className="text-slate-600 mb-6">
                Static pages that revalidate after a specified interval.
              </p>
              <Link
                href="/isr"
                className="block w-full py-3 px-4 bg-[#41E2BA] text-white text-center rounded-md hover:bg-[#35c5a1] transition-colors"
              >
                View ISR Example
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Examples Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            API Endpoints
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Health Check
              </h3>
              <p className="text-slate-600 mb-4">
                Check if your application is running properly.
              </p>
              <a
                href="/api/health"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#41E2BA]/10 p-4 rounded-md overflow-x-auto text-[#41E2BA] hover:bg-[#41E2BA]/20 transition-colors"
              >
                <code className="font-mono">
                  GET /api/health
                </code>
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Current Time
              </h3>
              <p className="text-slate-600 mb-4">
                Get the current server time.
              </p>
              <a
                href="/api/time"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#41E2BA]/10 p-4 rounded-md overflow-x-auto text-[#41E2BA] hover:bg-[#41E2BA]/20 transition-colors"
              >
                <code className="font-mono">
                  GET /api/time
                </code>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-100 text-center">
        <p className="text-slate-600">
          © {new Date().getFullYear()} {config.NEXT_PUBLIC_APP_NAME}. Built with Next.js and AWS Amplify.
        </p>
      </footer>
    </main>
  );
}
