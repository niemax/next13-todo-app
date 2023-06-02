import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import RootLayout from "./layout"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  console.log("SESSION:", session)

  return <main>Hello from todo app!</main>
}
