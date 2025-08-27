import type { ScrollShadowVisibility } from '@heroui/react'
import { cn, ScrollShadow } from '@heroui/react'
import type { ScrollAreaProps as ScrollAreaRootProps } from '@radix-ui/react-scroll-area'
import {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area'
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  LegacyRef,
  PropsWithChildren,
  UIEventHandler,
} from 'react'
import { forwardRef, useCallback, useState } from 'react'

type OnScrollState = { isAtTop: boolean; isAtBottom: boolean }
type ScrollAreaProps = {
  areaProps?: Omit<ScrollAreaRootProps, 'onScroll'>
  disabledShadow?: boolean
  defaultShadowVisibility?: ScrollShadowVisibility
  orientation?: 'vertical' | 'horizontal'
  classNames?: {
    root?: string
    scrollbar?: string
    thumb?: string
  }
  onScroll?: (state: OnScrollState) => void
  viewportRef?: LegacyRef<HTMLDivElement>
  viewportProps?: ComponentPropsWithoutRef<typeof ScrollAreaViewport>
}

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaRoot>,
  PropsWithChildren<ScrollAreaProps>
>((props, ref) => {
  const {
    areaProps,
    disabledShadow,
    defaultShadowVisibility = 'auto',
    orientation = 'vertical',
    children,
    classNames,
    viewportRef,
    viewportProps,
    onScroll,
  } = props

  const [scrollShadowVisibility, setScrollShadowVisibility] =
    useState<ScrollShadowVisibility>(defaultShadowVisibility)

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const isAtTop = e.currentTarget.scrollTop <= 0
      const isAtBottom =
        e.currentTarget.scrollTop + 0.5 >=
        e.currentTarget.scrollHeight - e.currentTarget.clientHeight

      const isAtMiddle =
        e.currentTarget.scrollTop > 0 &&
        e.currentTarget.scrollTop <
          e.currentTarget.scrollHeight - e.currentTarget.clientHeight

      if (isAtTop) {
        setScrollShadowVisibility('bottom')
      } else if (isAtBottom) {
        setScrollShadowVisibility('top')
      } else if (isAtMiddle) {
        setScrollShadowVisibility('both')
      } else {
        setScrollShadowVisibility('auto')
      }

      onScroll?.({ isAtTop, isAtBottom })
    },
    [onScroll],
  )

  return (
    <ScrollShadow
      className="flex h-full max-h-full w-full max-w-full"
      visibility={disabledShadow ? 'none' : scrollShadowVisibility}
      orientation={orientation}
      hideScrollBar
    >
      <ScrollAreaRoot
        ref={ref}
        className={cn(
          'relative h-full max-h-full w-full overflow-hidden pr-4',
          classNames?.root,
        )}
        type="always"
        {...areaProps}
      >
        <ScrollAreaViewport
          className="h-full w-full rounded-[inherit]"
          {...viewportProps}
          onScroll={handleScroll}
          ref={viewportRef}
        >
          {children}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
          className={cn(
            'flex h-full w-2 touch-none select-none rounded border-l border-l-transparent p-[1px] transition-[colors,width]',
            classNames?.scrollbar,
          )}
          orientation={orientation}
        >
          <ScrollAreaThumb
            className={cn(
              'relative flex-1 rounded-full bg-default-200/60 hover:bg-default-300/60',
              classNames?.thumb,
            )}
          />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </ScrollShadow>
  )
})

ScrollArea.displayName = 'ScrollArea'

export { ScrollArea }
export type { ScrollAreaProps, OnScrollState }
