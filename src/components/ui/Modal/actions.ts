"use server"

import { revalidatePath } from "next/cache"
import prisma from "../../../../prisma/prisma"

async function getCurrentTodo(todoID: string) {
  return await prisma.todo.findUnique({
    where: {
      id: todoID,
    },
  })
}

export async function updateTodo(todoID: string, formData: FormData) {
  // CODE
  const currentTodo = getCurrentTodo(todoID as string)

  await prisma.todo.update({
    where: {
      id: todoID as string,
    },
    data: {
      title: (formData.get("title") as string) ?? currentTodo?.title,
      description:
        (formData.get("description") as string) ?? currentTodo?.description,
    },
  })
  revalidatePath("/")
}

export async function deleteTodo(todoID: string) {
  await prisma.todo.delete({
    where: {
      id: todoID,
    },
  })
  revalidatePath("/")
}

export async function createTodo(formData: FormData) {
  await prisma.todo.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
  })
  revalidatePath("/")
}

export async function toggleTodoComplete(todoID: string) {
  const currentTodo = await getCurrentTodo(todoID as string)
  console.log("currentTodo", currentTodo)

  await prisma.todo.update({
    where: {
      id: todoID as string,
    },
    data: {
      completed: !currentTodo?.completed,
    },
  })
  revalidatePath("/")
}
