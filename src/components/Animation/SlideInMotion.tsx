import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowLeft from '@/assets/icons/arrow-left.svg?react'
import { setDragging } from '../../utils/dragState'

interface SlideInMotionProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
  title?: string
}

const SlideInMotion = ({
  isOpen,
  onClose,
  children,
  className = '',
  title,
}: SlideInMotionProps) => {
  const [exitX, setExitX] = useState<'100%' | '-100%'>('100%')
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setExitX('100%')
    }
  }, [isOpen])

  const handleBack = () => {
    setExitX('-100%')
    setShouldRender(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        onClose?.()
      }}
    >
      {shouldRender && (
        <motion.div
          drag="x"
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setTimeout(() => setDragging(false), 0)
            const absX = Math.abs(info.offset.x)
            const absY = Math.abs(info.offset.y)
            if (absX > absY && info.offset.x > 100) {
              handleBack()
            }
          }}
          dragConstraints={{ left: 0, right: 0 }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: exitX }}
          transition={{ type: 'tween', duration: 0.3 }}
          className={`bg-gray-10 fixed top-0 left-0 z-50 flex h-full w-full flex-col overflow-hidden ${className}`}
          style={{ touchAction: 'none' }}
        >
          <div className="absolute top-6.5 z-10 flex items-center gap-2 pl-4 text-gray-900">
            <ArrowLeft onClick={handleBack} className="cursor-pointer" />
            <p className="text-fs16 sm:text-fs18">{title}</p>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideInMotion
