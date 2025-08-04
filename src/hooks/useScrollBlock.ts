import { useEffect } from 'react'

export const useScrollBlock = (block: boolean) => {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (block) {
      const scrollY = window.scrollY
      body.dataset.scrollY = String(scrollY)

      html.style.overflow = 'hidden'
      html.style.position = 'relative'
      body.style.position = 'relative'
    } else {
      const scrollY = body.dataset.scrollY
      html.style.overflow = ''
      html.style.position = ''
      body.style.position = ''
      delete body.dataset.scrollY

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10))
      }
    }
  }, [block])
}
