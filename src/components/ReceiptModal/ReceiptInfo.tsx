interface ReceiptInfoProps {
  label: string
  value: React.ReactNode
  className?: string
}

const ReceiptInfo = ({ label, value, className = '' }: ReceiptInfoProps) => {
  return (
    <div
      className={`flex w-full flex-col gap-1.5 rounded-md border-1 border-gray-100 p-3 ${className}`}
    >
      <div className="text-[12px] text-gray-600">{label}</div>
      <div className="text-[14px] font-medium break-all whitespace-pre-line text-gray-900">
        {value}
      </div>
    </div>
  )
}
export default ReceiptInfo
