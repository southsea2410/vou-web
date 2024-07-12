"use client";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { ReactNode, useState } from "react";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // If set to a number, failed queries will retry until the failed query count reaches that number.
        retryOnMount: false, // If true, the query will re-fetch on mount if the cached data is stale.
        refetchOnWindowFocus: false, // If "always", the query will always re-fetch in the background on window focus.
        refetchOnReconnect: false, // Defaults to true . If true, the query will re-fetch on reconnect if the cached data is stale
        staleTime: 5 * 60 * 1000, // The time in milliseconds after data becomes stale.
      },
    },
  });

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(createQueryClient);

  return (
    <TanstackQueryProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </TanstackQueryProvider>
  );
}
