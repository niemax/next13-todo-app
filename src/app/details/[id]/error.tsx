"use client" // Error components must be Client Components

import { Button } from "@/components/shadcn/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col place-items-center">
      <h2 className="font-bold text-2xl mb-4">Something went wrong!</h2>
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
