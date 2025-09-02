import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Counter } from '@/components/counter'
import { ErrorPanel } from '@/components/error-panel'
import { HealthData } from '@/components/health-data'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { getQueryClient, trpc } from '@/server/trpc/server'

export default async function AppPage() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.health.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col items-center justify-center gap-5 pt-4 lg:pt-8">
        <ThemeSwitcher />
        <Counter />
        <ErrorBoundary
          fallback={
            <ErrorPanel
              visibleError
              error={new Error('Health Data Component error.')}
            />
          }
        >
          <Suspense fallback={<div>Fetching health...</div>}>
            <HealthData />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrationBoundary>
  )
}
