import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { caller } from '@/server/trpc/server'

const trpc = caller()

async function handler(_: NextRequest) {
  try {
    const response = await trpc.health()
    return NextResponse.json(response)
  } catch (error) {
    console.error('Health check failed:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return handler(req)
}

export async function POST(req: NextRequest) {
  return handler(req)
}
