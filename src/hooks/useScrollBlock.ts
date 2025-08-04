import { useEffect } from 'react'

export const useScrollBlock = (block: boolean) => {
  useEffect(() => {
    const body = document.body

    if (block) {
      const scrollY = window.scrollY
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = '0'
      body.style.right = '0'
      body.style.overflow = 'hidden'
      body.dataset.scrollY = String(scrollY)
    } else {
      const scrollY = body.dataset.scrollY
      if (scrollY) {
        setTimeout(() => {
          body.style.position = ''
          body.style.top = ''
          body.style.left = ''
          body.style.right = ''
          body.style.overflow = ''
          window.scrollTo(0, parseInt(scrollY, 10))
          delete body.dataset.scrollY
        }, 300)
      }
    }
  }, [block])
}
