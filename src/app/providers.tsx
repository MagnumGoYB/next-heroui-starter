'use client'

import type { ThemeProviderProps } from 'next-themes'
import type { ReactNode } from 'react'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SuperJSON from 'superjson'

import type { AppRouter } from '@/server/trpc/routers/_app'

import { TRPCProvider, getQueryClient, getUrl } from '@/server/trpc/client'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: SuperJSON,
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <HeroUIProvider navigate={router.push}>
          <ToastProvider toastProps={{ timeout: 3000 }} />
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HeroUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TRPCProvider>
    </QueryClientProvider>
  )
}
