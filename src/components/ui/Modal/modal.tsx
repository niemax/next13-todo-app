"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { useState } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import Form from "../form/form"

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
  const { pending } = useFormStatus()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <Form
          action={action}
          id={id}
          title={title}
          description={description}
          completed={completed}
        />
      </DialogContent>
    </Dialog>
  )
}
