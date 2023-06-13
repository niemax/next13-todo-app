"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <>
      <div>
        <button onClick={() => signIn("github")}>Sign in with github</button>
      </div>
    </>
  )
}
