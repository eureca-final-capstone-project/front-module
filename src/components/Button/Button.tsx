interface ButtonProps {
  text: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button = ({
  text,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`font-regular shadow-button cursor-pointer rounded-sm p-3.5 text-lg disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
