'use client'

import { Button, addToast } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useTRPC } from '@/server/trpc/client'

export function HealthData() {
  const trpc = useTRPC()
  const { data, error, isFetching, refetch } = useSuspenseQuery(
    trpc.health.queryOptions(void 0, {
      retry: false,
      enabled: false,
    }),
  )

  const isRefetching = isFetching && data !== undefined

  useEffect(() => {
    if (error) {
      addToast({
        title: error.data?.code,
        description: error.message,
        color: 'danger',
        variant: 'flat',
      })
    }
  }, [error])

  return (
    <>
      <div className="prose dark:prose-invert">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Button isLoading={isRefetching} onPress={() => refetch()}>
        Refetch
      </Button>
    </>
  )
}
