import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import AppProviders from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Management Portal",
  description: "Management portal for VOU, a platform for vouchers and games",
  openGraph: {
    images: [
      {
        url: "/vou_bg.jpeg",
        width: 256,
        height: 256,
        alt: "VOU Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
