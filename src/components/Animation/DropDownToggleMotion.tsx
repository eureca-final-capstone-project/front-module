import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface DropdownToggleMotionProps {
  isOpen: boolean
  children: ReactNode
  className?: string
}

const DropdownToggleMotion = ({ isOpen, children, className = '' }: DropdownToggleMotionProps) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="dropdown-toggle-motion"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DropdownToggleMotion
