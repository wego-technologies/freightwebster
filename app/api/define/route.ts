import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
    const term = req.nextUrl.searchParams.get("term")
    if (!term) {
        return NextResponse.json({ message: 'Missing term', status: 400 });
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
        return NextResponse.json({ message: 'Term not found', status: 404 });
    }

    return NextResponse.json({
        ...glossaryTerm
    })
}
