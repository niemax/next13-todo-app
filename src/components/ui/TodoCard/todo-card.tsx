"use client"

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
      title={todo.title}
      description={todo.description as string}
      completed={todo.completed}
    >
      <Card
        key={todo.id}
        onClick={() => console.log("clickable!")}
        className="drop-shadow-lg hover:scale-110 transform transition-all duration-200 ease-in-out"
      >
        <CardHeader>
          <CardTitle>{todo.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{todo.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <p className={`text-xs text-${todo.completed ? "green" : "red"}`}>
            {todo.completed ? "completed" : "not completed"}
          </p>
        </CardFooter>
      </Card>
    </Modal>
  )
}
