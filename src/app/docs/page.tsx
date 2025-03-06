import { config } from '@/lib/env';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <Link href="/" className="text-[#41E2BA] hover:underline mb-8 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-6 mb-4">API Documentation</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the available API endpoints for your {config.NEXT_PUBLIC_APP_NAME} application.
          </p>
        </div>

        <div className="space-y-12 mb-12">
          {/* Health Endpoint */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Health Check</h2>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm font-medium">GET</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Endpoint</h3>
              <a
                href="/api/health"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#41E2BA]/10 p-4 rounded-md font-mono text-[#41E2BA] hover:bg-[#41E2BA]/20 transition-colors"
              >
                /api/health
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Description</h3>
              <p className="text-slate-600">
                Returns the current health status of the application, including uptime, environment, and timestamp.
                Use this endpoint to check if your application is running properly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Response</h3>
              <pre className="bg-slate-800 text-[#41E2BA] p-4 rounded-md overflow-x-auto text-sm">
                {`{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2023-03-14T12:34:56.789Z",
  "environment": "development",
  "supabaseConnected": true
}`}
              </pre>
            </div>
          </div>

          {/* Time Endpoint */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Current Time</h2>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm font-medium">GET</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Endpoint</h3>
              <a
                href="/api/time"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#41E2BA]/10 p-4 rounded-md font-mono text-[#41E2BA] hover:bg-[#41E2BA]/20 transition-colors"
              >
                /api/time
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Description</h3>
              <p className="text-slate-600">
                Returns the current server time in multiple formats including ISO, Unix timestamp, and formatted time.
                This endpoint runs at the edge for optimal performance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Response</h3>
              <pre className="bg-slate-800 text-[#41E2BA] p-4 rounded-md overflow-x-auto text-sm">
                {`{
  "iso": "2023-03-14T12:34:56.789Z",
  "unix": 1678800896,
  "formatted": {
    "local": "3/14/2023, 12:34:56 PM",
    "utc": "Tue, 14 Mar 2023 12:34:56 GMT"
  }
}`}
              </pre>
            </div>
          </div>

          {/* Echo Endpoint */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Echo Message</h2>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm font-medium">GET</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Endpoint</h3>
              <div className="block bg-[#41E2BA]/10 p-4 rounded-md font-mono text-[#41E2BA]">
                /api/echo/{'{message}'}
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Try it: <a href="/api/echo/hello-world" target="_blank" rel="noopener noreferrer" className="text-[#41E2BA] hover:underline">/api/echo/hello-world</a>
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Description</h3>
              <p className="text-slate-600">
                Echoes back the provided message. This demonstrates dynamic route parameters in API routes.
                You can also add query parameters to the URL which will be included in the response.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-2">Parameters</h3>
              <div className="border-l-4 border-[#41E2BA] pl-4">
                <p className="font-medium text-slate-700">Path Parameters:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 mr-2">message</span>
                    <span className="text-slate-600">The message to echo back</span>
                  </li>
                </ul>

                <p className="font-medium text-slate-700 mt-4">Query Parameters:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 mr-2">any</span>
                    <span className="text-slate-600">Any query parameters will be included in the response</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Response</h3>
              <pre className="bg-slate-800 text-[#41E2BA] p-4 rounded-md overflow-x-auto text-sm">
                {`{
  "message": "hello-world",
  "queryParams": {
    "foo": "bar"
  },
  "echoed": true,
  "timestamp": "2023-03-14T12:34:56.789Z",
  "environment": "development"
}`}
              </pre>
              <p className="mt-2 text-sm text-slate-500">
                Example request: <code className="bg-slate-100 px-2 py-1 rounded">/api/echo/hello-world?foo=bar</code>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Testing Your AWS Amplify Deployment</h2>
          <p className="text-slate-600 mb-6">
            Use these API endpoints to test connectivity, server-side rendering, and other aspects of your AWS Amplify deployment.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/ssr" className="px-6 py-3 rounded-md bg-[#41E2BA] text-white hover:bg-[#35c5a1] transition-colors">
              Test SSR Performance
            </Link>
            <Link href="/ssg" className="px-6 py-3 rounded-md bg-white border border-[#41E2BA] text-[#41E2BA] hover:bg-[#41E2BA]/10 transition-colors">
              Test SSG Pages
            </Link>
            <Link href="/isr" className="px-6 py-3 rounded-md bg-white border border-[#41E2BA] text-[#41E2BA] hover:bg-[#41E2BA]/10 transition-colors">
              Test ISR Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
