import React from 'react'

interface FloatingLabelInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  className?: string
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder=""
        className={`peer block w-full rounded-sm border bg-white px-3.5 py-4 text-sm text-gray-900 focus:ring-0 focus:outline-none disabled:cursor-not-allowed ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-pri-500 hover:border-pri-500 border-gray-400'} `}
      />
      <label
        htmlFor={id}
        className={`font-regular absolute top-2 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 ${error ? 'text-red-500' : 'peer-focus:text-pri-500 text-gray-400'} `}
      >
        {label}
      </label>
    </div>
  )
}

export default FloatingLabelInput
