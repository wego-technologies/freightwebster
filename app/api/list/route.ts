import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/prisma/client';

export async function GET(req: NextRequest) {
    const searchTerm = req.nextUrl.searchParams.get("search");
    const orderBy = req.nextUrl.searchParams.get("sortBy") || 'term';

    if (orderBy !== 'views' && orderBy !== 'createdAt' && orderBy !== 'term') {
        return NextResponse.json({ message: 'Invalid order by parameter', status: 400 });
    }

    let whereClause = {};
    if (searchTerm) {
        whereClause = {
            term: {
                contains: searchTerm,
                mode: 'insensitive'
            },
        };
    }

    const glossaryTerms = await prisma.glossary.findMany({
        where: whereClause,
        orderBy: {
            [orderBy]: 'desc',
        },
        select: {
            term: true,
            views: true,
            createdAt: true,
        }
    });

    if (!glossaryTerms.length) {
        return NextResponse.json({ message: 'No terms found', status: 404 });
    }

    return NextResponse.json(glossaryTerms);
}
