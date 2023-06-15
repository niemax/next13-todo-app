import Form from "@/components/ui/form/form"
import { getCurrentTodo } from "@/lib/db-actions"
import { ChevronLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  const todo = await getCurrentTodo(id)

  return {
    title: todo?.title,
    /*    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
   */
  }
}

export default async function DetailsPage({ params }: any) {
  const todo = await getCurrentTodo(params.id)
  const date = new Date(todo?.createdAt ?? Date.now())
  const formattedDate = new Intl.DateTimeFormat("fi-FI").format(date)

  if (!todo) {
    throw new Error("Todo not found")
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-10 flex flex-row justify-between items-center">
        <Link href="/" className="flex flex-row">
          <ChevronLeft /> Back
        </Link>
        <p className="text-sm font-light text-gray-500">{formattedDate}</p>
      </div>
      <Form
        action="edit"
        id={todo.id}
        title={todo.title}
        description={todo.description as string}
      />
    </div>
  )
}
