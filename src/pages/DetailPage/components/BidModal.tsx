import Button from '../../../components/Button/Button'
import Modal from '../../../components/Modal/Modal'
import InfoIcon from '@/assets/icons/info.svg?react'
import { formatAmount } from '../../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import Input from '../../../components/Input/Input'
import { useState } from 'react'

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  currentHeightPrice: number
  onClickLeft: () => void
  onClickRight: (bidAmount: number) => void
}

const BidModal = ({
  isOpen,
  onClose,
  currentHeightPrice,
  onClickLeft,
  onClickRight,
}: BidModalProps) => {
  const [bidAmount, setBidAmount] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9]/g, '')
    setBidAmount(numericValue)

    if (error) {
      setError(false)
      setErrorMsg('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedBidAmount = parseInt(bidAmount, 10)

    // 1. 유효한 숫자가 아니거나 입력이 비어있는 경우
    if (isNaN(parsedBidAmount) || bidAmount === '') {
      setError(true)
      setErrorMsg('입찰 금액을 입력해주세요.')
      return
    }

    // 2. 현재 입찰가보다 낮거나 같은 경우
    if (parsedBidAmount <= currentHeightPrice) {
      setError(true)
      setErrorMsg('입찰 금액은 현재 입찰가보다 높아야 합니다.')
      return
    }
    // 3. 100원 단위가 아닌 경우
    if (parsedBidAmount % 100 !== 0) {
      setError(true)
      setErrorMsg('입찰 금액은 100원 단위여야 합니다.')
      return
    }

    onClickRight(parsedBidAmount)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="sm:w-104.5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <h2 className="text-fs18 sm:text-fs20 font-medium">
            입찰가를 입력하시고 입찰을 진행해주세요.
          </h2>
          <div className="flex flex-col pt-3">
            <div className="flex items-center gap-1 font-medium">
              <InfoIcon />
              <h3>입찰 규칙</h3>
            </div>
            <div className="border-b-1 border-gray-100 pt-1"></div>
            <div className="text-fs12 sm:text-fs14 flex flex-col gap-2 pt-3">
              <p>• 최소 입찰가는 현재 입찰가 이상이어야 합니다.</p>
              <p>• 입찰 금액은 100원 단위로 입력해주세요.</p>
              <span className="text-error">
                • 입찰 시 취소가 불가능하며 입찰가만큼 페이가 차감됩니다.
              </span>
            </div>
          </div>
          <div className="flex items-center pt-3">
            <div className="flex w-full items-center justify-between border-b-1 border-gray-100 pb-1">
              <h3 className="font-medium">현재 입찰가</h3>
              <div className="text-pri-600 flex items-center gap-1 font-medium">
                <DatchaCoinIcon />
                <span>{formatAmount(currentHeightPrice)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-3">
            <div className="flex flex-col">
              <h3 className="font-medium">입찰가</h3>
              <div className="mb-3 border-b-1 border-gray-100 pt-1"></div>
            </div>
            <Input
              id="bidAmount"
              label="입찰하실 금액을 입력해주세요."
              shape="square"
              type="number"
              suffix="원"
              value={bidAmount}
              prefix={<DatchaCoin className="h-5 w-5 sm:h-6 sm:w-6" />}
              onChange={handleBidAmountChange}
              error={error}
              errorMsg={errorMsg}
            />
          </div>

          <div className="flex gap-4">
            <Button
              className="text-fs16 flex-1 bg-gray-50 font-medium text-gray-800"
              text="닫기"
              onClick={onClickLeft}
            />
            <Button
              className="text-fs16 bg-pri-500 text-gray-10 flex-1 font-medium"
              text="입찰하기"
              type="submit"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default BidModal
