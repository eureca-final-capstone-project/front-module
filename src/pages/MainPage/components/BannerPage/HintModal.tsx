import Modal from '../../../../components/Modal/Modal'
import HintIcon from '@/assets/icons/bulb.svg?react'
import CloseIcon from '@/assets/icons/x.svg?react'
import Button from '../../../../components/Button/Button'

interface HintModalProps {
  isOpen: boolean
  onClose: () => void
  hintContent: string
}

const HintModal = ({ isOpen, onClose, hintContent }: HintModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-40 flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* 아이콘과 제목 */}
          <div className="flex items-center gap-1">
            <HintIcon className="h-5 w-5" />
            <h2 className="text-fs18 sm:text-fs20 font-semibold">힌트</h2>
          </div>
          {/* 닫기 버튼 */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon />
          </button>
        </div>

        {/* 힌트 내용 */}
        <p className="flex h-full items-center justify-center text-gray-800">
          {hintContent || '힌트가 없습니다.'}
        </p>

        {/* 확인 버튼 */}
        <Button
          onClick={onClose}
          text="확인"
          className="bg-pri-500 text-gray-10 text-fs18 font-medium"
        />
      </div>
    </Modal>
  )
}

export default HintModal
