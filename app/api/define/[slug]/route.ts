import prisma from '@/prisma/client'
import { IndividualTermData } from '@/types/general'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, requestParams: { params: { slug: string } }) {
  const slug = requestParams.params.slug

  const orderBy = req.nextUrl.searchParams.get('orderBy') || 'term'

  if (!slug) {
    return NextResponse.json({ message: 'Missing term', status: 400 })
  }

  const validOrderBy = orderBy === 'views' ? 'views' : 'term'
  console.log('validOrderBy', validOrderBy)

  const glossaryTerm = await dbGetTerms(slug, validOrderBy)

  if (!glossaryTerm) {
    return NextResponse.json({ message: 'Term not found', status: 404 })
  }

  const res = new NextResponse()
  res.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  return NextResponse.json(
    {
      ...glossaryTerm,
    },
    res
  )
}

const dbGetTerms = async (
  slug: string,
  orderBy: 'term' | 'views' | null
): Promise<IndividualTermData | null> => {
  if (!slug) {
    return null
  }

  const glossaryTerm = await prisma.glossary.findUnique({
    where: {
      slug
    },
    select: {
      term: true,
      definition: true,
      views: true,
      createdAt: true,
    },
  })

  if (!glossaryTerm) {
    return null
  }

  // Increment the views count
  await prisma.glossary.update({
    where: {
      slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  })

  // Fetch next and previous terms based on orderBy
  let nextTerm = null,
    prevTerm = null

  if (orderBy === 'term') {
    nextTerm = await prisma.glossary.findFirst({
      where: {
        term: {
          gt: glossaryTerm.term,
        },  
      },
      orderBy: {
        term: 'asc',
      },
      select: {
        term: true,
        slug: true,
      },
    })

    prevTerm = await prisma.glossary.findFirst({
      where: {
        term: {
          lt: glossaryTerm.term,
        },
      },
      orderBy: {
        term: 'desc',
      },
      select: {
        term: true,
        slug: true,
      },
    })
  } else if (orderBy === 'views') {
    nextTerm = await prisma.glossary.findFirst({
      where: {
        AND: [{ views: { gt: glossaryTerm.views } }, { term: { not: glossaryTerm.term } }],  
      },
      orderBy: {
        views: 'asc',
      },
      select: {
        term: true,
        slug: true,
      },
    })

    prevTerm = await prisma.glossary.findFirst({
      where: {
        AND: [{ views: { lt: glossaryTerm.views } }, { term: { not: glossaryTerm.term } }],
      },
      orderBy: {
        views: 'desc',
      },
      select: {
        term: true,
        slug: true,
      },
    })
  }

  return {
    ...glossaryTerm,
    nextTerm: nextTerm,
    prevTerm: prevTerm,
  }
}
