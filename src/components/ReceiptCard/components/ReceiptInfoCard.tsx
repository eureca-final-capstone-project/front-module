interface ReceiptInfoCardProps {
  label: string
  value: string
}

const ReceiptInfoCard = ({ label, value }: ReceiptInfoCardProps) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-md border-1 border-gray-100 p-3">
      <p className="text-[12px] font-medium text-gray-600">{label}</p>
      <p className="text-[14px] text-gray-900">{value}</p>
    </div>
  )
}

export default ReceiptInfoCard
