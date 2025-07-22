interface ButtonProps {
  text: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
  shape?: 'square' | 'underline'
}

const Button = ({
  text,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  shape = 'square',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${shape === 'underline' ? 'hover:text-pri-400 underline decoration-current underline-offset-4' : 'shadow-button rounded-sm p-3.5 leading-none'} transition-smooth cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
