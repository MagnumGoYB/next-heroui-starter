'use client'

import { HeroUIProvider, type ToastProps, ToastProvider } from '@heroui/react'
import type { RouterOptions } from '@react-types/shared'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { useCallback, useMemo } from 'react'
import SuperJSON from 'superjson'
import isProduction from '@/lib/is-production'
import { getQueryClient, getUrl, TRPCProvider } from '@/server/trpc/client'
import type { AppRouter } from '@/server/trpc/routers/_app'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

const isProductionEnv = isProduction()

const ReactQueryDevtools = !isProductionEnv
  ? dynamic(
      () =>
        import('@tanstack/react-query-devtools').then(
          (m) => m.ReactQueryDevtools,
        ),
      { ssr: false },
    )
  : null

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
  toastProps?: ToastProps
}

export function Providers({
  children,
  themeProps,
  toastProps,
}: ProvidersProps) {
  const router = useRouter()
  const queryClient = getQueryClient()

  const trpcClient = useMemo(
    () =>
      createTRPCClient<AppRouter>({
        links: [
          httpBatchLink({
            url: getUrl(),
            transformer: SuperJSON,
          }),
        ],
      }),
    [],
  )

  const navigate = useCallback(
    (href: string, options?: RouterOptions) => {
      router.push(href, options)
    },
    [router],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <HeroUIProvider navigate={navigate}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          <ToastProvider toastProps={{ timeout: 3000, ...toastProps }} />
        </HeroUIProvider>
        {ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
