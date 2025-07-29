import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react'

interface ScrollToTopButtonProps {
  threshold?: number
  className?: string
}

const ScrollToTopButton = ({ threshold = 300, className }: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > threshold) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [toggleVisibility])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`bg-gray-10 focus:ring-pri-500 focus:ring-opacity-80 shadow-header-modal fixed right-6 bottom-8 z-40 flex cursor-pointer items-center justify-center rounded-full p-2.5 text-white ring-2 ring-gray-100 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:outline-none sm:right-16 ${className}`}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          aria-label="맨 위로 스크롤"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
