'use client'

import { addToast, Button } from '@heroui/react'
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <Button
      radius="full"
      variant="solid"
      onPress={() => {
        setCount(count + 1)
        addToast({
          title: 'Toast title',
          description: 'Toast displayed successfully',
        })
      }}
    >
      Count is {count}
    </Button>
  )
}
