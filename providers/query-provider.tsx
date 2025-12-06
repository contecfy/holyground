/**
 * React Query Provider
 * Wraps the app with React Query client
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import devtools only in development
const ReactQueryDevtools = dynamic(
  () =>
    process.env.NODE_ENV === "development"
      ? import("@tanstack/react-query-devtools").then((mod) => ({
          default: mod.ReactQueryDevtools,
        }))
      : Promise.resolve({ default: () => null }),
  { ssr: false }
);

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
