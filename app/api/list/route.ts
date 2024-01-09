import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get('search')
  const orderBy = req.nextUrl.searchParams.get('sortBy') || 'term'

  if (orderBy !== 'views' && orderBy !== 'createdAt' && orderBy !== 'term') {
    return NextResponse.json({ message: 'Invalid order by parameter', status: 400 })
  }

  let whereClause = {}
  if (searchTerm) {
    whereClause = {
      term: {
        contains: searchTerm,
        mode: 'insensitive',
      },
      definition: {
        not: null,
      },
    }
  }

  const glossaryTerms = await prisma.glossary.findMany({
    where: whereClause,
    orderBy: {
      [orderBy]: 'desc',
    },
    select: {
      term: true,
      slug: true,
      views: true,
      createdAt: true,
    },
  })

  const res = new NextResponse()
  res.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  if (!glossaryTerms.length) {
    return NextResponse.json({ message: 'No terms found', status: 404 })
  }

  return NextResponse.json(glossaryTerms, res)
}
