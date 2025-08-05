import Button from '../../../../components/Button/Button'
import Modal from '../../../../components/Modal/Modal'
import CloseIcon from '@/assets/icons/x.svg?react'

interface WrongAnswerModalProps {
  isOpen: boolean
  onClose: () => void
}

const WrongAnswerModal = ({ isOpen, onClose }: WrongAnswerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col gap-10 text-center">
        {/* 제목 */}
        <h2 className="text-fs18 sm:text-fs20 font-semibold">오답입니다 😥</h2>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>
        <p className="text-gray-700">힌트를 참고해 다시 시도해보세요.</p>

        <Button
          onClick={onClose}
          text="확인"
          className="bg-pri-500 text-gray-10 text-fs18 font-medium"
        />
      </div>
    </Modal>
  )
}

export default WrongAnswerModal
