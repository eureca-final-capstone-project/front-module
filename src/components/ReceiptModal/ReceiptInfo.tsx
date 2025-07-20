interface ReceiptInfoProps {
  label: string
  value: React.ReactNode
}

const ReceiptInfo = ({ label, value }: ReceiptInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5 rounded-md border-1 border-gray-100 p-3">
      <div className="text-[12px] text-gray-600">{label}</div>
      <div className="text-[14px] font-medium text-gray-900">{value}</div>
    </div>
  )
}

export default ReceiptInfo
