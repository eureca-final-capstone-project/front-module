import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const scaleDownVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 0.98, transition: { duration: 0.2, ease: 'easeInOut' } },
  tap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeInOut' } },
}

interface ScaleDownMotionProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const ScaleDownMotion = ({ children, className = '', disabled = false }: ScaleDownMotionProps) => {
  if (disabled) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={scaleDownVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.div>
  )
}

export default ScaleDownMotion
