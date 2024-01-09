import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { term } = body

  if (!term) return NextResponse.json({ message: 'Missing term' }, { status: 400 })

   const glossaryTerm = await prisma.glossary.create({
      data: {
         term: term,
         slug: term.toLowerCase().replace(/\s/g, '-'),
         views: 0,
         definition: '',
         createdAt: new Date(),
      },
   })

   return NextResponse.json(glossaryTerm, { status: 201 })
}
