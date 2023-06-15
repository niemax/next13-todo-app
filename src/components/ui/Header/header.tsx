import React from "react"
import Avatar from "../Avatar/avatar"
import Link from "next/link"
import Modal from "../Modal/modal"
import { Button } from "@/components/shadcn/button"
import { Plus } from "lucide-react"

export default function Header() {
  return (
    <header className="shadow-sm">
      <nav className="container mx-auto flex flex-row items-center justify-between sm:p-2 md:p-4 p-2">
        <div>
          <Link href="/">
            <p className="text-xl font-bold">TODO APP</p>
          </Link>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <Modal id="" title="" description="" completed={false} action="new">
            <div>
              <Button
                type="button"
                className="rounded-full bg-green-400 w-[50px] h-[50px] drop-shadow-xl"
              >
                <Plus className="h-8 w-8" />
              </Button>
            </div>
          </Modal>
          <Avatar />
        </div>
      </nav>
    </header>
  )
}
