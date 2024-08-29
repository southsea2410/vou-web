import { ReactNode } from "react";

import QueryClientProvider from "./QueryClientProvider";
import ClientAuthProvider from "./ClientAuthProvider";
import NotificationProvider from "./NotificationProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <ClientAuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ClientAuthProvider>
    </QueryClientProvider>
  );
}
