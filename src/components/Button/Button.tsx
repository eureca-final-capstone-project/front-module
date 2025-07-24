import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
  shape?: 'square' | 'underline'
  smallPadding?: boolean
  extraSmallPadding?: boolean
  noShadow?: boolean
}
const scaleDownVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 0.98, transition: { duration: 0.2, ease: 'easeInOut' } },
  tap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeInOut' } },
}
const Button = ({
  text,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  shape = 'square',
  smallPadding = false,
  extraSmallPadding = false,
  noShadow = false,
}: ButtonProps) => {
  const paddingClass =
    shape === 'underline'
      ? ''
      : extraSmallPadding
        ? 'px-2 py-1'
        : smallPadding
          ? 'px-2.5 py-2 sm:px-6 sm:py-2.5'
          : 'p-3.5'
  const baseClass =
    shape === 'underline'
      ? disabled
        ? 'underline decoration-current underline-offset-4 text-gray-400'
        : 'hover:text-pri-400 underline decoration-current underline-offset-4'
      : `${noShadow ? '' : 'shadow-button'} rounded-sm leading-none`

  return shape === 'underline' || disabled ? (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${paddingClass} transition-smooth cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  ) : (
    <motion.button
      variants={scaleDownVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${paddingClass} transition-smooth cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </motion.button>
  )
}

export default Button
