import Button from '../../../components/Button/Button'
import Modal from '../../../components/Modal/Modal'
import { formatDataSize } from '../../../utils/format'

interface ChangeDataModalProps {
  isOpen: boolean
  onClose: () => void
  onClickLeft: () => void
  onClickRight: () => void
  afterTotalDataMb: number
  afterSellableDataMb: number
}

const ChangeDataModal = ({
  isOpen,
  onClose,
  onClickLeft,
  onClickRight,
  afterTotalDataMb,
  afterSellableDataMb,
}: ChangeDataModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="sm:w-100">
      <div className="flex flex-col gap-4">
        <h2 className="text-fs18 sm:text-fs20 font-medium">판매 가능 데이터로 전환하시겠습니까?</h2>
        <span className="text-fs12 text-error sm:text-fs14">
          판매 가능 데이터로 전환 시, 보유 데이터로 재전환이 불가합니다.
        </span>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">전환 후 데이터 정보</h3>
            <div className="border border-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex w-full items-center justify-between">
              <p>보유 데이터</p>
              <p>{formatDataSize(afterTotalDataMb)}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p>판매 가능 데이터</p>
              <p>{formatDataSize(afterSellableDataMb)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex gap-4">
        <Button
          className="text-fs16 flex-1 bg-gray-50 font-medium text-gray-800"
          text="닫기"
          onClick={onClickLeft}
        />
        <Button
          className="text-fs16 bg-pri-500 text-gray-10 flex-1 font-medium"
          text="전환하기"
          onClick={onClickRight}
        />
      </div>
    </Modal>
  )
}

export default ChangeDataModal
