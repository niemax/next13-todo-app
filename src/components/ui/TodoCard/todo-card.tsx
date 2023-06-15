import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import Link from "next/link"
import type { Todo } from "@/app/page"

interface TodoCardProps {
  todo: Todo
}

export default function TodoCard({ todo }: TodoCardProps) {
  const date = new Date(todo.createdAt)
  const formattedDate = new Intl.DateTimeFormat("fi-FI").format(date)
  return (
    <Link key={todo.id} href={`/details/${todo.id}`}>
      <Card
        key={todo.id}
        className="drop-shadow-lg hover:scale-110 transform transition-all duration-200 ease-in-out"
      >
        <CardHeader>
          <CardTitle>{todo.title}</CardTitle>
          <p className="text-xs text-gray-400">{formattedDate}</p>
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
    </Link>
  )
}
