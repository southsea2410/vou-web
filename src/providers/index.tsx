import { ReactNode } from "react";
import QueryClientProvider from "./QueryClientProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
