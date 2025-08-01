import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import XIcon from '@/assets/icons/x.svg?react'

interface SlideInMotionProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
}

const SlideInMotion = ({ isOpen, onClose, children, className = '' }: SlideInMotionProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            if (info.offset.x > 100) onClose?.()
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className={`bg-gray-10 fixed top-0 left-0 z-50 flex h-full w-full flex-col overflow-hidden ${className}`}
        >
          <button onClick={onClose} className="absolute top-6 right-4 z-10 text-gray-500">
            <XIcon className="h-4 w-4 text-gray-900" />
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideInMotion
