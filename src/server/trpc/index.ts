import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import SuperJSON from 'superjson'

export const createContext = cache(async () => {
  return {}
})

const t = initTRPC.context<typeof createContext>().create({
  transformer: SuperJSON,
})

const timingMiddleware = t.middleware(async ({ next, path }) => {
  if (process.env.NODE_ENV !== 'development') {
    return next()
  }

  const start = Date.now()
  const result = await next()
  const end = Date.now()

  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

export const createRouter = t.router
export const createCaller = t.createCallerFactory

export const timingProcedure = t.procedure.use(timingMiddleware)
