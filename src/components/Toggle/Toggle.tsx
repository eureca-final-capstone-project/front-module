interface ToggleProps {
  checked: boolean
  onToggle: (state: boolean) => void
}

const Toggle = ({ checked, onToggle }: ToggleProps) => {
  return (
    <label
      className={`relative block h-6 w-12 cursor-pointer rounded-full transition-colors ${
        checked ? 'bg-pri-400' : 'bg-gray-200'
      }`}
      onClick={e => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(!checked)}
        className="sr-only"
      />
      <span
        className={`bg-gray-10 absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></span>
    </label>
  )
}

export default Toggle
