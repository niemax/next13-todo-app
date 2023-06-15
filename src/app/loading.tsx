import { Skeleton } from "@/components/shadcn/skeleton"
import React from "react"

export default function Loading() {
  return (
    <div className="flex items-center space-x-4 mt-20">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[200px] w-[280px] rounded-md" />
      ))}
    </div>
  )
}
