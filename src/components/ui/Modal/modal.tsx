"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Textarea } from "@/components/shadcn/textarea"
import Alert from "../Alert/alert"
import { createTodo, toggleTodoComplete, updateTodo } from "./actions"
import { useEffect, useState } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

type ActionType = "new" | "edit"

interface ModalProps {
  title: string
  id: string
  description: string
  completed: boolean
  action: ActionType
  children: React.ReactNode
}

export default function Modal({
  id,
  title,
  description,
  completed,
  action,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(false)
  const [todoCompleted, setTodoCompleted] = useState(completed)
  const { pending } = useFormStatus()

  async function handleFormSubmission(formData: FormData) {
    switch (action) {
      case "new":
        return createTodo(formData).then(() => setOpen(false))
      case "edit":
        return updateTodo(id, formData).then(() => setOpen(false))
    }
  }

  console.log("state:", todoCompleted)
  console.log("prop:", completed)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <form
          action={(formData: FormData) => {
            handleFormSubmission(formData)
          }}
        >
          <div className="mt-4">
            <div className="flex flex-col">
              <Label htmlFor="title" className="text-left mb-2">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                className="col-span-3"
                defaultValue={title}
                placeholder="Title"
                required
              />
            </div>
            <div className="flex flex-col mt-10">
              <Label htmlFor="description" className="text-left mb-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={10}
                defaultValue={description}
                placeholder="Description"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={pending}>
              {action === "edit" ? "Save changes" : "Create"}
            </Button>
          </DialogFooter>
          {action === "edit" && (
            <div className="mt-10 flex flex-row justify-between items-center">
              <Alert todoID={id} setOpen={setOpen}>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete todo
                </Button>
              </Alert>
              <Button
                variant={completed ? "secondary" : "outline"}
                type="button"
                onClick={() => {
                  toggleTodoComplete(id)
                  setOpen(false)
                }}
              >
                Mark as {completed ? "incomplete" : "complete"}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
