import { useState } from 'react'

interface ToggleProps {
  initialState?: boolean
  onToggle?: (state: boolean) => void
}

const Toggle = ({ initialState = false, onToggle }: ToggleProps) => {
  const [isOn, setIsOn] = useState(initialState)

  const handleChange = () => {
    setIsOn(prev => {
      const newState = !prev
      onToggle?.(newState)
      return newState
    })
  }
  return (
    <label
      className={`relative block h-6 w-12 cursor-pointer rounded-full transition-colors ${
        isOn ? 'bg-pri-400' : 'bg-gray-200'
      }`}
      onClick={e => e.stopPropagation()}
    >
      <input type="checkbox" checked={isOn} onChange={handleChange} className="sr-only" />
      <span
        className={`bg-gray-10 absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></span>
    </label>
  )
}

export default Toggle
