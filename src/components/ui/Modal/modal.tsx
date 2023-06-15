"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { useState } from "react"
import Form from "../form/form"
import { useRouter } from "next/navigation"

export type ActionType = "new" | "edit"

interface ModalProps {
  title: string
  id: string
  description: string
  completed: boolean
  action: ActionType
  isOpen?: boolean
  children?: React.ReactNode
}

export default function Modal({
  id,
  title,
  description,
  completed,
  action,
  isOpen = false,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(isOpen)
  const router = useRouter()

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        !open && action === "edit" && router.back()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? "Details" : "New todo"}
          </DialogTitle>
        </DialogHeader>
        <Form
          action={action}
          id={id}
          title={title}
          description={description}
          completed={completed}
          setModalOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
