import { ReactNode } from "react";

import QueryClientProvider from "./QueryClientProvider";
import ClientAuthProvider from "./ClientAuthProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <ClientAuthProvider>{children}</ClientAuthProvider>
    </QueryClientProvider>
  );
}
