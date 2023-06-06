import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (session) {
    return new Response("Welcome authenticated user", {
      status: 200,
    })
  }

  return new Response("Unauthorized", {
    status: 401,
  })
}
