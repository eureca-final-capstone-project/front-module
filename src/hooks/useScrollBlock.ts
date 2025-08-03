import { useEffect } from 'react'

export const useScrollBlock = (block: boolean) => {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevHtmlPosition = html.style.position
    const prevBodyPosition = body.style.position
    const prevScrollY = window.scrollY

    if (block) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      html.style.position = 'fixed'
      body.style.position = 'fixed'
      body.style.top = `-${prevScrollY}px`
    }

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      html.style.position = prevHtmlPosition
      body.style.position = prevBodyPosition
      body.style.top = ''
      window.scrollTo(0, prevScrollY)
    }
  }, [block])
}
