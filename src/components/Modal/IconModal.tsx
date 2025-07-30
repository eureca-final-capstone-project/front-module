import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import FadeInUpMotion from '../Animation/FadeInUpMotion'
import CloseIcon from '@/assets/icons/x.svg?react'

interface IconModalProps {
  isOpen: boolean
  onClose: () => void
  icon: ReactNode
  title: string
  description?: string
  children: ReactNode
  className?: string
}

const IconModal = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  children,
  className = '',
}: IconModalProps) => {
  useEffect(() => {
    if (!isOpen) return

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="bg-modal-background fixed inset-0 z-100 flex cursor-pointer items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(1.5px)' }}
      >
        <FadeInUpMotion custom={0} duration={0.3}>
          <div
            onClick={e => e.stopPropagation()}
            className="relative flex cursor-default flex-col items-center"
          >
            <div className="shadow-receipt-top bg-error-light absolute -top-7 z-10 flex h-14 w-14 items-center justify-center rounded-full">
              {icon}
            </div>
            <div
              className={`flex w-82 flex-col overflow-hidden rounded-md sm:w-[31rem] ${className}`}
            >
              <div className="bg-gray-10 flex flex-col gap-5 px-4 pt-9 pb-5">
                <div className="flex flex-col gap-[0.5rem]">
                  <div className="-mb-2 flex justify-end">
                    <CloseIcon
                      className="transition-smooth cursor-pointer text-gray-400 hover:text-gray-800 focus:text-gray-800"
                      onClick={onClose}
                    />
                  </div>
                  <h2 className="text-fs18 md:text-fs20 text-center font-medium text-gray-900">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-fs12 md:text-fs14 text-center text-gray-500">
                      {description}
                    </p>
                  )}
                </div>
                <hr className="border-gray-100" />
                {children}
              </div>
            </div>
          </div>
        </FadeInUpMotion>
      </motion.div>
    </AnimatePresence>
  )
}

export default IconModal
