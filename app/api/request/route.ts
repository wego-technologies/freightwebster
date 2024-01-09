import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import z from 'zod'

const RequestBodySchema = z.object({
  newTerm: z.string().max(124),
})

export async function POST(req: Request) {
  const { newTerm } = RequestBodySchema.parse(await req.json())

  const existingTerm = await prisma.glossary.findFirst({
    where: {
      term: {
        contains: newTerm,
        mode: 'insensitive',
      },
    },
  })

  if (existingTerm) {
    return NextResponse.json({ message: `${newTerm} already exists or has been requested`, status: 400 })
  }

  const createdTerm = await prisma.glossary.create({
    data: {
      term: newTerm,
      slug: newTerm.toLowerCase().replace(/\s+/g, '-'),
      definition: null,
    },
    select: {
      term: true,
      slug: true,
      definition: true,
      views: true,
      createdAt: true,
    },
  })

  if (!createdTerm) {
    return NextResponse.json({ message: 'Error creating term', status: 500 })
  }

  return NextResponse.json(createdTerm, {
    status: 201,
  })
}