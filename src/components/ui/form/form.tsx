"use client"

import { createTodo, toggleTodoComplete, updateTodo } from "@/lib/db-actions"
import React, { useState } from "react"
import { ActionType } from "../Modal/modal"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Textarea } from "@/components/shadcn/textarea"
import { Button } from "@/components/shadcn/button"
import Alert from "../Alert/alert"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormProps {
  action: ActionType
  id: string
  title: string
  description: string
  completed?: boolean
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({
  action,
  id,
  title,
  description,
  completed,
  setModalOpen,
}: FormProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleFormSubmission(formData: FormData) {
    switch (action) {
      case "new":
        return createTodo(formData).then(() => setModalOpen?.(false))
      case "edit":
        return updateTodo(id, formData).then(() => router.back())
    }
  }

  return (
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
      <div className="flex mt-4 place-items-end w-full">
        <Button type="submit">
          {action === "edit" ? "Save changes" : "Create"}
        </Button>
      </div>
      <div className="mt-10 flex flex-row justify-between items-center">
        {action === "edit" ? (
          <>
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
                router.back()
              }}
            >
              Mark as {completed ? "incomplete" : "complete"}
            </Button>
          </>
        ) : null}
      </div>
    </form>
  )
}
