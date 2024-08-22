import { ReactNode } from "react";

import AuthProvider from "./AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    // <AuthProvider>
    <QueryClientProvider>{children}</QueryClientProvider>
    // </AuthProvider>
  );
}
