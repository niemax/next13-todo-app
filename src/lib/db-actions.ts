"use server"

import { revalidatePath } from "next/cache"
import prisma from "../prisma/prisma"

export async function getCurrentTodo(todoID: string) {
  return await prisma.todo
    .findUnique({
      where: {
        id: todoID,
      },
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function updateTodo(todoID: string, formData: FormData) {
  // CODE
  const currentTodo: any = getCurrentTodo(todoID as string)

  try {
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
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTodo(todoID: string) {
  try {
    await prisma.todo.delete({
      where: {
        id: todoID,
      },
    })
    revalidatePath("/")
  } catch (error) {
    console.error(error)
  }
}

export async function createTodo(formData: FormData) {
  try {
    await prisma.todo.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error(error)
  }
}

export async function toggleTodoComplete(todoID: string) {
  const currentTodo = await getCurrentTodo(todoID as string)
  console.log("currentTodo", currentTodo)

  try {
    await prisma.todo.update({
      where: {
        id: todoID as string,
      },
      data: {
        completed: !currentTodo?.completed,
      },
    })
    revalidatePath("/")
  } catch (error) {
    console.error(error)
  }
}
