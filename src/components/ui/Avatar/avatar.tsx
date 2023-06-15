"use client"

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

export default function Avatar() {
  const session = useSession()
  const image = session?.data?.user?.image ?? ""

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ShadcnAvatar>
          <AvatarImage
            src={image}
            alt={`profile_picture_of_${session?.data?.user?.name ?? "Unknown"}`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </ShadcnAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Signed in as:</DropdownMenuLabel>
        <p className="text-sm font-medium text-gray-900 truncate pl-2">
          {session?.data?.user?.name ?? "Unknown"}
        </p>
        <p className="text-xs font-medium text-gray-500 truncate pl-2">
          {session?.data?.user?.email ?? "Unknown"}
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
