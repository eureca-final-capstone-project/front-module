import CircleCheckIcon from '@/assets/icons/circle-check.svg?react'
import NoIcon from '@/assets/icons/delete.svg?react'

interface EndOfFeedMessageProps {
  type?: 'Yes' | 'No'
  text?: string
}

const EndOfFeedMessage = ({
  text = '모든 게시글을 확인했어요!',
  type = 'Yes',
}: EndOfFeedMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-600">
      {type === 'No' ? (
        <NoIcon className="text-error mb-4 h-8 w-8" />
      ) : (
        <CircleCheckIcon className="mb-4 h-8 w-8" />
      )}
      <span className="text-fs14">{text}</span>
    </div>
  )
}

export default EndOfFeedMessage
