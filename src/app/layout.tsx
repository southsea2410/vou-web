import type { Metadata } from "next";
import "./globals.css";

import GlassProvider from "glass-js";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import AppProviders from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlassProvider>
          <AppProviders>{children}</AppProviders>
          <Toaster />
        </GlassProvider>
      </body>
    </html>
  );
}
