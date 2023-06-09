import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"
import TodoCard from "@/components/ui/TodoCard/todo-card"
import Modal from "@/components/ui/Modal/modal"
import { Plus } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs"

export type Todo = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

async function getData() {
  const res = await fetch(process.env.URL + "/api/todos", {
    method: "GET",
    cache: "no-store",
  })

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

  const undoneTodos = todos.filter((todo: Todo) => !todo.completed)
  const doneTodos = todos.filter((todo: Todo) => todo.completed)

  return (
    <div>
      <Tabs defaultValue="undone">
        <div className="w-full flex place-items-center flex-col">
          <TabsList className="mb-10">
            <TabsTrigger value="undone">Not completed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="undone">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      <Modal id="" title="" description="" completed={false} action="new">
        <div className="mt-10">
          <Button
            type="button"
            className="rounded-full bg-green-400 w-[60px] h-[60px] drop-shadow-xl"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </Modal>
    </div>
  )
}
