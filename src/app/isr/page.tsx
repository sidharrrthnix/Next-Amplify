import Link from 'next/link';

// Use fetch with ISR revalidation and better error handling
async function getData() {
  // Mock data to use if API calls fail
  const mockData = {
    crypto: {
      bitcoin: { usd: 68423 },
      ethereum: { usd: 3942 }
    },
    quote: {
      content: "The best way to predict the future is to create it.",
      author: "Abraham Lincoln"
    },
    generatedAt: new Date().toISOString(),
    isMock: true
  };

  try {
    // Add a timeout to the fetch to avoid hanging if the API is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // ISR fetch with 60-second revalidation
    const [cryptoRes, quoteRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd', {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        signal: controller.signal
      }).catch(() => null),
      fetch('https://api.quotable.io/random', {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        signal: controller.signal
      }).catch(() => null)
    ]);

    clearTimeout(timeoutId);

    // Check if both responses are okay
    if (cryptoRes?.ok && quoteRes?.ok) {
      const cryptoData = await cryptoRes.json();
      const quoteData = await quoteRes.json();

      return {
        crypto: cryptoData,
        quote: quoteData,
        generatedAt: new Date().toISOString(),
        isMock: false
      };
    }

    // Fall back to mock data if either request failed
    console.log("Using mock data due to failed API requests");
    return mockData;
  } catch (error) {
    console.error('Error fetching ISR data:', error);
    // Return mock data if API calls fail
    return mockData;
  }
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-[#41E2BA] hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-6 mb-4">Incremental Static Regeneration (ISR)</h1>

        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">How ISR Works</h2>
            <p className="text-slate-600 mb-4">
              With ISR, pages are initially generated statically, then regenerated in the background after a set interval. This approach:
            </p>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-2">
              <li>Combines the benefits of static generation with fresh data</li>
              <li>Updates pages without rebuilding the entire site</li>
              <li>Ensures users always see relatively fresh content</li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">ISR Data Example</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Last Generated At:</h3>
                <div className="bg-slate-50 p-3 rounded-md font-mono text-sm">
                  {data.generatedAt}
                </div>
                <p className="text-xs text-slate-500 mt-1">This timestamp changes when the page regenerates</p>
                {data.isMock && (
                  <p className="text-xs text-amber-600 mt-1">
                    Note: Currently displaying mock data due to API connectivity issues.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Cryptocurrency Prices:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-3">₿</div>
                      <div>
                        <h4 className="text-slate-700 font-medium">Bitcoin</h4>
                        <p className="text-2xl font-bold">${data.crypto.bitcoin?.usd.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">Ξ</div>
                      <div>
                        <h4 className="text-slate-700 font-medium">Ethereum</h4>
                        <p className="text-2xl font-bold">${data.crypto.ethereum?.usd.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-slate-700 mb-2">Random Quote:</h3>
                <div className="bg-slate-50 p-5 rounded-md">
                  <blockquote className="border-l-4 border-[#41E2BA] pl-4 italic text-slate-700">
                    &quot;{data.quote.content}&quot;
                  </blockquote>
                  <p className="text-right mt-2 text-slate-600">— {data.quote.author}</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-purple-50 rounded-md">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-purple-700">This content revalidates every 60 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
