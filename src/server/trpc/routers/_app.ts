import { createRouter, timingProcedure } from '..'

let count = 0

export const appRouter = createRouter({
  health: timingProcedure.query(async () => {
    count++
    if (count % 3 === 0) {
      throw new Error('Simulated health check failure')
    }
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000)) // Random delay up to 2 seconds
    return {
      status: 'ok',
      timestamp: Date.now(),
    }
  }),
})

export type AppRouter = typeof appRouter
