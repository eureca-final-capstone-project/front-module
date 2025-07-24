import { useEffect, useRef, useState } from 'react'

/**
 * 사용 예시:
 * const {
 *   ref: sectionRef,
 *   containerRef,
 *   triggerScroll
 * } = useScrollToRef<HTMLDivElement>()
 *
 * return (
 *   <div ref={containerRef} className="overflow-y-auto h-full">
 *     ...
 *     <div ref={sectionRef}>이곳으로 스크롤</div>
 *   </div>
 * )
 *
 * 스크롤 트리거:
 * triggerScroll() 호출 시 `sectionRef`가 있는 위치로 이동합니다.
 */

const useScrollToRef = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [shouldScroll, setShouldScroll] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldScroll && ref.current && containerRef.current) {
      const target = ref.current
      const container = containerRef.current

      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: 'smooth',
      })

      setShouldScroll(false)
    }
  }, [shouldScroll])

  const triggerScroll = () => {
    setShouldScroll(false)
    requestAnimationFrame(() => setShouldScroll(true))
  }

  return {
    ref,
    containerRef,
    triggerScroll,
  }
}

export default useScrollToRef
