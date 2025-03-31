// src/hooks/useAutoScroll.ts
import { useEffect, useState, RefObject } from 'react'

export default function useAutoScroll(
  scrollRef: RefObject<HTMLDivElement | null>,
  dependencyLength: number
) {
  const [autoScroll, setAutoScroll] = useState(true)

  const scrollToBottom = () => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [dependencyLength, autoScroll]) // ✅ stable array

  return { autoScroll, setAutoScroll }
}
