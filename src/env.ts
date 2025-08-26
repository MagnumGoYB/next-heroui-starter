import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().default(3000),
    VERCEL: z.coerce.boolean().default(false),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERCEL: process.env.VERCEL === '1',
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  emptyStringAsUndefined: true,
})
