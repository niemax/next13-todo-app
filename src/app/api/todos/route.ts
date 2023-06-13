import { NextResponse } from "next/server"
import prisma from "../../../prisma/prisma"

export async function GET() {
  const todos = await prisma.todo.findMany()

  if (!todos) {
    return new Response("No todos found", {
      status: 404,
    })
  }

  return NextResponse.json({ data: todos })
}
