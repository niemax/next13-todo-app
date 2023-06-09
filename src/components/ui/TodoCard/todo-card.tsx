import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import type { Todo } from "@prisma/client"
import Modal from "../Modal/modal"

interface TodoCardProps {
  todo: Todo
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <Modal
      id={todo.id}
      title={todo.title}
      description={todo.description as string}
      completed={todo.completed}
      action="edit"
      aria-label="todo-card"
    >
      <Card
        key={todo.id}
        className="drop-shadow-lg hover:scale-110 transform transition-all duration-200 ease-in-out"
      >
        <CardHeader>
          <CardTitle>{todo.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{todo.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <p
            className={`text-xs ${
              todo.completed ? "text-green-700" : "text-red-400"
            }`}
          >
            {todo.completed ? "completed" : "not completed"}
          </p>
        </CardFooter>
      </Card>
    </Modal>
  )
}
