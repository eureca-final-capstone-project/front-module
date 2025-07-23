import Button from '../../../../components/Button/Button'

interface InfoCardProps {
  title: string
  showEditBtn?: boolean
  onEditClick?: () => void
  children?: React.ReactNode
}

const InfoCard = ({ title, showEditBtn = false, onEditClick, children }: InfoCardProps) => {
  return (
    <div
      className={`rounded-custom-m bg-gray-10 flex h-full w-full flex-col gap-7 border-1 border-gray-200 px-4 py-5 lg:p-5 ${
        showEditBtn ? 'max-w-75' : ''
      }`}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-fs14 lg:text-fs16 font-medium text-gray-500">{title}</h2>
        {showEditBtn && (
          <Button
            text="수정하기"
            onClick={onEditClick}
            shape="underline"
            className="text-pri-400 hover:text-pri-600 text-fs12 lg:text-fs14"
          />
        )}
      </div>
      <div className="flex flex-grow flex-col justify-between">{children}</div>
    </div>
  )
}

export default InfoCard
