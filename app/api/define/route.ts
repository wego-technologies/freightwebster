import prisma from '@/prisma/client';
import { IndividualTermData } from '@/types/terms';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const term = req.nextUrl.searchParams.get("term");
    const orderBy = req.nextUrl.searchParams.get("orderBy") || 'term';

    if (!term) {
        return NextResponse.json({ message: 'Missing term', status: 400 });
    }

    const validOrderBy = orderBy === 'views' ? 'views' : 'term';
    console.log('validOrderBy', validOrderBy);

    const glossaryTerm = await dbGetTerms(term, validOrderBy);

    if (!glossaryTerm) {
        return NextResponse.json({ message: 'Term not found', status: 404 });
    }

    return NextResponse.json({
        ...glossaryTerm
    });
}



const dbGetTerms = async (
    term: string,
    orderBy: 'term' | 'views' | null
): Promise<IndividualTermData | null> => {
    if (!term) {
        return null;
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
        }
    });

    if (!glossaryTerm) {
        return null;
    }

    // Increment the views count
    await prisma.glossary.update({
        where: {
            term,
        },
        data: {
            views: {
                increment: 1
            },
        },
    });

    // Fetch next and previous terms based on orderBy
    let nextTerm = null, prevTerm = null;

    if (orderBy === 'term') {
        nextTerm = await prisma.glossary.findFirst({
            where: {
                term: {
                    gt: term,
                },
            },
            orderBy: {
                term: 'asc',
            },
        });

        prevTerm = await prisma.glossary.findFirst({
            where: {
                term: {
                    lt: term,
                },
            },
            orderBy: {
                term: 'desc',
            },
        });
    } else if (orderBy === 'views') {
        nextTerm = await prisma.glossary.findFirst({
            where: {
                AND: [
                    { views: { gt: glossaryTerm.views } },
                    { term: { not: term } } // Exclude current term
                ],
            },
            orderBy: {
                views: 'asc',
            },
        });
    
        prevTerm = await prisma.glossary.findFirst({
            where: {
                AND: [
                    { views: { lt: glossaryTerm.views } },
                    { term: { not: term } } // Exclude current term
                ],
            },
            orderBy: {
                views: 'desc',
            },
        });
    }
    

    return {
        ...glossaryTerm,
        nextTerm: nextTerm?.term,
        prevTerm: prevTerm?.term,
    };
}