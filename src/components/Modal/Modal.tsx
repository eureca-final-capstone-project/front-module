import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInUpMotion from '../Animation/FadeInUpMotion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  positionClassName?: string
  className?: string
}

const Modal = ({ isOpen, onClose, children, positionClassName = '', className }: ModalProps) => {
  const unlockScroll = () => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
      window.addEventListener('keydown', handleEsc)
    } else {
      unlockScroll()
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      unlockScroll()
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence onExitComplete={unlockScroll}>
      <motion.div
        key="backdrop"
        className={`bg-modal-background fixed inset-0 z-100 transition-opacity ${
          isOpen ? positionClassName || 'flex items-center justify-center' : 'hidden'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(1.5px)' }}
      >
        {isOpen && (
          <FadeInUpMotion custom={0} duration={0.3}>
            <motion.div
              key="modal"
              className={`bg-gray-10 rounded-custom-m shadow-modal flex min-w-82 flex-col overflow-hidden`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={`max-h-[62vh] overflow-y-auto p-5 ${className ?? ''}`}>
                {children}
              </div>
            </motion.div>
          </FadeInUpMotion>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default Modal
