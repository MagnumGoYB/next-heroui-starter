'use client'

import { ErrorPanel } from '@/components/error-panel'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <ErrorPanel error={error} reset={reset} />
    </div>
  )
}
