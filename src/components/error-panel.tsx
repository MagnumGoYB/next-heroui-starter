'use client'

import { Alert, Button } from '@heroui/react'
import { useEffect } from 'react'

import { title } from '@/components/primitives'

export function ErrorPanel({
  error,
  visibleError,
  reset,
}: {
  error: Error
  visibleError?: boolean
  reset?: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-w-xl flex-col items-center justify-center gap-4">
      <h2 className={title({ color: 'violet', className: '!leading-normal' })}>
        Something went wrong!
      </h2>
      <Button
        variant="ghost"
        color="secondary"
        onPress={() => {
          reset ? reset() : window.location.reload()
        }}
      >
        Try again
      </Button>
      {visibleError && error.message && (
        <Alert
          variant="flat"
          className="mt-5"
          color="danger"
          title={error.message}
        />
      )}
    </div>
  )
}
