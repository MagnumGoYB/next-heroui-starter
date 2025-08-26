import 'server-only'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { cache } from 'react'

import { makeQueryClient } from '@/lib/make-query-client'

import { createContext } from '.'
import { appRouter } from './routers/_app'

export const getQueryClient = cache(makeQueryClient)

export const caller = () => {
  return appRouter.createCaller(createContext)
}

export const trpc = createTRPCOptionsProxy({
  router: appRouter,
  ctx: createContext,
  queryClient: getQueryClient,
})
