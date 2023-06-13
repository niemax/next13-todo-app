import Modal from "@/components/ui/Modal/modal"
import { getCurrentTodo } from "@/lib/db-actions"

export default async function DetailsModal({ params }: any) {
  const todo = await getCurrentTodo(params.id)
  if (!todo) {
    throw new Error("No todo found!")
  }

  return (
    <Modal
      id={todo.id}
      title={todo.title}
      description={todo.description as string}
      completed={todo.completed}
      action="edit"
      isOpen={true}
    />
  )
}
