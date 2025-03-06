import { config } from '@/lib/env';
import Link from 'next/link';

// Use fetch with SSG (only executed at build time)
async function getData() {
  try {
    // Static data fetching that only happens at build time
    const res = await fetch('https://api.github.com/repos/aws-amplify/amplify-js', {
      next: {
        tags: ['ssg-build']
      }
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    return {
      repoInfo: await res.json(),
      buildTime: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching static data:', error);
    return {
      error: 'Failed to fetch repository data',
      buildTime: new Date().toISOString()
    };
  }
}

export default async function SSGPage() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-[#41E2BA] hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-6 mb-4">Static Site Generation (SSG)</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">How SSG Works</h2>
            <p className="text-slate-600 mb-4">
              With SSG, pages are generated at build time and reused for each request. This approach is useful when:
            </p>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-2">
              <li>The content doesn&apos;t change frequently</li>
              <li>Pages can be pre-rendered ahead of a user&apos;s request</li>
              <li>You want the fastest possible page loads</li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Static Data Example</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Build Timestamp:</h3>
                <div className="bg-slate-50 p-3 rounded-md font-mono text-sm">
                  {data.buildTime}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Environment:</h3>
                <div className="bg-slate-50 p-3 rounded-md font-mono text-sm">
                  {config.NEXT_PUBLIC_ENVIRONMENT}
                </div>
              </div>

              {data.repoInfo && !data.error ? (
                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-2">Amplify JS Repository Info:</h3>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h4 className="font-semibold text-lg">{data.repoInfo.name}</h4>
                    <p className="text-slate-600 my-2">{data.repoInfo.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-slate-700">{data.repoInfo.stargazers_count.toLocaleString()} stars</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1 text-slate-700">{data.repoInfo.forks_count.toLocaleString()} forks</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1 text-slate-700">{data.repoInfo.watchers_count.toLocaleString()} watchers</span>
                      </div>
                    </div>
                    <a
                      href={data.repoInfo.html_url}
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

              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-blue-700">This content was generated at build time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
