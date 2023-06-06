import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../prisma/prisma"

export async function GET(request: Request) {
  return NextResponse.json("Hello from specific todo")
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const currentTodo = await prisma.todo.findUnique({
    where: {
      id: id as string,
    },
  })
  console.log(id)
  /*   await prisma.todo.update({
    where: {
      id: id as string,
    },
    data: {
      title: request?.body?.title ?? currentTodo?.title,
      description: request?.body?.description ?? currentTodo?.description,
    },
  }) */

  return NextResponse.json("Hello from specific todo")
}
