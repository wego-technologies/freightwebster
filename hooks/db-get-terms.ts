import prisma from '@/prisma/client'
import { IndividualTermData } from '@/types/terms'

const dbGetTerms = async (term: string): Promise<IndividualTermData | null> => {
  if (!term) {
    return null
  }

  const glossaryTerm = await prisma.glossary.findUnique({
    where: {
      term,
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
      term,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    select: {
      id: true,
    },
  })

  return
}

export default dbGetTerms
