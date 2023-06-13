import Form from "@/components/ui/form/form"
import { getCurrentTodo } from "@/lib/db-actions"

export default async function DetailsPage({ params }: any) {
  const todo = await getCurrentTodo(params.id)

  if (!todo) {
    throw new Error("Todo not found")
  }

  return (
    <Form
      action="edit"
      id={todo.id}
      title={todo.title}
      description={todo.description as string}
    />
  )
}
