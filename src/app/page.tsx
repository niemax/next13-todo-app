import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"
import TodoCard from "@/components/ui/TodoCard/todo-card"

export const revalidate = 5

export type Todo = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

async function getData() {
  const res = await fetch(process.env.URL + "/api/todos", { method: "GET" })

  // Recommendation: handle errors
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

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {todos.map((todo: Todo) => (
          <TodoCard todo={todo as any} />
        ))}
      </div>
    </div>
  )
}
