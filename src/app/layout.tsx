"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Header from "@/components/Header/header";
import { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <html lang="en">
        <Header />
        <body className={inter.className}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </body>
      </html>
    </NextUIProvider>
  );
}
