import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useScrollBlock } from '../../hooks/useScrollBlock'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const BottomSheet = ({ isOpen, onClose, children, title }: BottomSheetProps) => {
  useScrollBlock(isOpen)
  const [startY, setStartY] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // mouse drag (desktop)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || startY === null) return
      const deltaY = e.clientY - startY
      if (deltaY > 100) {
        setDragging(false)
        setStartY(null)
        onClose()
      }
    }
    const handleMouseUp = () => {
      setDragging(false)
      setStartY(null)
    }

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, startY, onClose])

  // touch drag (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return
    const deltaY = e.touches[0].clientY - startY

    const content = contentRef.current
    const isAtTop = content?.scrollTop === 0

    if (deltaY > 100 && isAtTop) {
      setStartY(null)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white"
            style={{ maxHeight: '64vh', display: 'flex', flexDirection: 'column' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              ref={headerRef}
              className="cursor-pointer px-4 pt-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setStartY(null)}
              onMouseDown={e => {
                setStartY(e.clientY)
                setDragging(true)
              }}
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300" />
              <h2 className="text-fs18 font-semibold">{title}</h2>
              <hr className="mt-4 border-t border-t-gray-200" />
            </div>
            <div
              ref={contentRef}
              className="scrollbar-hide flex-1 overflow-y-auto p-4 pb-6"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setStartY(null)}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BottomSheet
