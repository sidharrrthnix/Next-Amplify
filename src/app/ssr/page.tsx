import { config } from '@/lib/env';
import Link from 'next/link';

// Explicitly mark as server component
export const dynamic = 'force-dynamic';

async function getData() {
  try {
    // Native fetch in server components - no cache for SSR
    const res = await fetch('https://api.github.com/repos/vercel/next.js', {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return {
      repoInfo: {
        name: data.name,
        stars: data.stargazers_count,
        description: data.description,
        url: data.html_url
      },
      timestamp: new Date().toISOString(),
      serverInfo: {
        node: process.version,
        platform: process.platform,
        environment: config.NEXT_PUBLIC_ENVIRONMENT
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      timestamp: new Date().toISOString(),
      serverInfo: {
        node: process.version,
        platform: process.platform,
        environment: config.NEXT_PUBLIC_ENVIRONMENT
      },
      error: 'Failed to fetch data'
    };
  }
}

export default async function SSRPage() {
  const data = await getData();
  console.log('server logs')
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-[#41E2BA] hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-6 mb-4">Server-Side Rendering (SSR)</h1>

        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">How SSR Works</h2>
            <p className="text-slate-600 mb-4">
              With SSR, the page is rendered on the server for each request. This approach is useful when:
            </p>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-2">
              <li>You need to show real-time or frequently updated data</li>
              <li>The page content is personalized for each user</li>
              <li>You need to access request-time information like cookies or headers</li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Live Data Example</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Request Timestamp:</h3>
                <div className="bg-slate-50 p-3 rounded-md font-mono text-sm">
                  {data.timestamp}
                </div>
              </div>

              {data.repoInfo ? (
                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-2">Next.js GitHub Repository:</h3>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h4 className="font-semibold text-lg">{data.repoInfo.name}</h4>
                    <p className="text-slate-600 my-2">{data.repoInfo.description}</p>
                    <div className="flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-slate-700">{data.repoInfo.stars.toLocaleString()} stars</span>
                    </div>
                    <a
                      href={data.repoInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[#41E2BA] hover:underline"
                    >
                      View on GitHub &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-md text-red-600">
                  {data.error || 'No repository data available'}
                </div>
              )}

              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Server Information:</h3>
                <div className="bg-slate-800 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{JSON.stringify(data.serverInfo, null, 2)}</pre>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-green-50 rounded-md">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-700">This content was generated on the server at request time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
