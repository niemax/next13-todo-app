import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"
import TodoCard from "@/components/ui/TodoCard/todo-card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs"
import { Metadata } from "next"
import { Suspense } from "react"

export type Todo = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export const metadata: Metadata = {
  title: "A simple todo app using NextJS 13.4 and Postgres",
  description: "This is a simple Todo app.",
}

async function getData() {
  const res = await fetch(process.env.URL + "/api/todos", {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const { data: todos } = await getData()

  if (!session) {
    redirect("/api/auth/signin")
  }

  const undoneTodos = todos.filter((todo: Todo) => !todo.completed)
  const doneTodos = todos.filter((todo: Todo) => todo.completed)

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1 className="text-3xl font-bold">Hello, {session?.user?.name}</h1>
        </div>
      </Suspense>
      <Tabs defaultValue="undone">
        <div className="w-full flex place-items-center flex-col mt-20">
          <TabsList className="mb-10">
            <TabsTrigger value="undone">Not completed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="undone">
          <div className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-4">
            {undoneTodos.map((todo: Todo) => (
              <TodoCard todo={todo as any} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {doneTodos.map((todo: Todo) => (
              <TodoCard todo={todo as any} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
