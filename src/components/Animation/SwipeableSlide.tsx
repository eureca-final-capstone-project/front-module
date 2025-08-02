import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { setDragging } from '../../utils/dragState'

interface SwipeableSlideProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
}

const SwipeableSlide = ({ isOpen, onClose, children }: SwipeableSlideProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag="x"
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setTimeout(() => setDragging(false), 0)
            const absX = Math.abs(info.offset.x)
            const absY = Math.abs(info.offset.y)
            if (absX > absY && info.offset.x > 100) {
              onClose?.()
            }
          }}
          dragConstraints={{ left: 0, right: 0 }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 z-50 h-full w-full bg-white shadow-lg"
          style={{ touchAction: 'none' }}
        >
          {/* 내부는 자유롭게 스크롤되도록 */}
          <div className="h-full overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SwipeableSlide
