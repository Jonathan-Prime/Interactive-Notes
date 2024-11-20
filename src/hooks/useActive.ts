import { useEffect, useState, useRef } from 'react'

export function useActive(time: number): boolean {
  const [active, setActive] = useState<boolean>(false)
  const timer = useRef<number>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = ['keypress', 'mousemove', 'touchmove', 'scroll']

  useEffect(() => {
    const handleEvent = (): void => {
      setActive(true)
      if (timer.current) {
        window.clearTimeout(timer.current)
      }

      timer.current = window.setTimeout(() => {
        setActive(false)
      }, time)
    }

    events.forEach((event: string) =>
      document.addEventListener(event, handleEvent)
    )

    return () => {
      events.forEach((event: string) =>
        document.removeEventListener(event, handleEvent)
      )
    }
  }, [events, time])

  return active
}
