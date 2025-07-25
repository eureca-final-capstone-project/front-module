import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button/Button'

interface FloatingActionButtonProps {
  show: boolean
  text: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

const FloatActionButton = ({
  show,
  text,
  onClick,
  disabled = false,
  className = '',
}: FloatingActionButtonProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-4 sm:px-0`}
        >
          <Button
            text={text}
            onClick={onClick}
            disabled={disabled}
            className={`text-fs16 w-full p-4 font-medium ${className}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatActionButton
