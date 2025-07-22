import Button from '../../../../components/Button/Button'
import Modal from '../../../../components/Modal/Modal'
import { modalTexts } from '../config'

interface BasicModalProps {
  isOpen: boolean
  onClose: () => void
  modalType: keyof typeof modalTexts
  onClickLeft: () => void
  onClickRight: () => void
}

const BasicModal = ({ isOpen, onClose, modalType, onClickLeft, onClickRight }: BasicModalProps) => {
  const { title, description, leftButtonText, rightButtonText } = modalTexts[modalType]

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="sm:w-94">
      <div className="flex flex-col gap-4">
        <h2 className="text-fs18 sm:text-fs20 font-medium">{title}</h2>
        <p className="text-fs14 mb-3 text-gray-500">{description}</p>
        <div className="flex gap-4">
          <Button
            className="text-fs16 flex-1 bg-gray-50 font-medium text-gray-800"
            text={leftButtonText}
            onClick={onClickLeft}
          />
          <Button
            className="text-fs16 bg-pri-500 text-gray-10 flex-1 font-medium"
            text={rightButtonText}
            onClick={onClickRight}
          />
        </div>
      </div>
    </Modal>
  )
}

export default BasicModal
