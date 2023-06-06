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
import { updateTodo } from "./actions"
import { ChangeEvent, useState } from "react"

interface ModalProps {
  title: string
  description: string
  completed: boolean
  children: React.ReactNode
}

export default function Modal({ title, description, children }: ModalProps) {
  // USING NextJS server actions here

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <form action={updateTodo}>
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
                /*                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitleValue(e.target.value)
                }
  */
              />
            </div>
            <div className="flex flex-col mt-6">
              <Label htmlFor="description" className="text-left mb-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={10}
                defaultValue={description}
                /*                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescriptionValue(e.target.value)
                }
  */
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
        <div className="mt-10 flex flex-row justify-between items-center">
          <Alert>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete todo
            </Button>
          </Alert>
          <Button variant="outline">Mark as completed</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
