import { ChangeEvent } from 'react'

interface FloatingLabelInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
}

const FloatingLabelInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = '',
  className = '',
}: FloatingLabelInputProps) => {
  return (
    <div className="flex flex-col">
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
      {error && <span className="text-error font-regular text-fs12 p-1 text-left">{error}</span>}
    </div>
  )
}

export default FloatingLabelInput
