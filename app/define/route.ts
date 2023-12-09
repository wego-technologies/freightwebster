import prisma from '@/prisma/client';
import { NextResponse } from 'next/server'


export async function GET(body) {
    return NextResponse.json(body)
}
