import "./globals.css"
import { Inter } from "next/font/google"
import { NextAuthProvider } from "./providers"
import Header from "@/components/ui/Header/header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
            {modal}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
