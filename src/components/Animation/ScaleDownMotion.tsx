import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

import type { PropsWithChildren } from 'react'

const scaleDownVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 0.98, transition: { duration: 0.2, ease: 'easeInOut' } },
  tap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeInOut' } },
}

const ScaleDownMotion = ({ children }: PropsWithChildren) => (
  <motion.div
    className="relative mx-auto h-40 w-full"
    variants={scaleDownVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
  >
    {children}
  </motion.div>
)

export default ScaleDownMotion
