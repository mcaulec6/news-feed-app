import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
    <div className="min-h-screen bg-gray-50">
        <div
        className="
          mx-auto w-full
          px-4 sm:px-6 lg:px-8
          max-w-screen-sm
          sm:max-w-screen-md
          md:max-w-screen-lg
          lg:max-w-screen-xl
          xl:max-w-screen-2xl
        "
      >
        {children}
        </div>
    </div>
    );
}