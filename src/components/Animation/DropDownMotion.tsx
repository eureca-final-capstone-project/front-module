import { motion } from 'framer-motion'
import type { HTMLMotionProps, Variants } from 'framer-motion'

const slideFade: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

const DropdownMotion = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div variants={slideFade} initial="hidden" animate="visible" exit="exit" {...props}>
      {children}
    </motion.div>
  )
}

export default DropdownMotion
