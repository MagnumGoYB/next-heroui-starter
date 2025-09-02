import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'
import { createContext } from '@/server/trpc'
import { appRouter } from '@/server/trpc/routers/_app'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext,
  })

export async function GET(req: NextRequest) {
  return handler(req)
}

export async function POST(req: NextRequest) {
  return handler(req)
}
