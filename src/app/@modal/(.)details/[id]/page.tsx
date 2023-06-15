import Modal from "@/components/ui/Modal/modal"
import { getCurrentTodo } from "@/lib/db-actions"

interface Props {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function DetailsModal({ params: { id } }: Props) {
  const todo = await getCurrentTodo(id)

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
      isOpen
    />
  )
}
