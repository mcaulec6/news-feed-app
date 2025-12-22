import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto grid min-h-screen w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center">
        {/* Left panel */}
        <div className="hidden lg:block">
          <div className="rounded-2xl border border-gray-200 bg-white/60 p-10 shadow-sm backdrop-blur">
            <h1 className="text-4xl font-semibold text-gray-900">News Feed</h1>
            <p className="mt-4 text-lg text-gray-700">
              Save keywords that matter to you and browse matching stories from public news feeds.
            </p>

            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600">
                Tip: add 2–5 keywords (e.g. “ukraine”, “election”, “tech”) for best results.
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            {children}
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Powered by NewsAPI
          </p>
        </div>
      </div>
    </div>
  );
}
