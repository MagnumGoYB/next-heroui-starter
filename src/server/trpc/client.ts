'use client'

import type { QueryClient } from '@tanstack/react-query'

import { createTRPCContext } from '@trpc/tanstack-react-query'

import { env } from '@/env'
import { makeQueryClient } from '@/lib/make-query-client'

import type { AppRouter } from './routers/_app'

let clientQueryClientSingleton: QueryClient

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = makeQueryClient()
  }
  return clientQueryClientSingleton
}

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    return `http://localhost:${env.PORT}`
  })()

  return `${base}/api/trpc`
}

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>()
