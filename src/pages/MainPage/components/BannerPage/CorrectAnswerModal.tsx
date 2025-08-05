import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Modal from '../../../../components/Modal/Modal'
import Button from '../../../../components/Button/Button'
import CloseIcon from '@/assets/icons/x.svg?react'

interface CorrectAnswerModalProps {
  isOpen: boolean
  reward: number
  onClose: () => void
}

const CorrectAnswerModal = ({ isOpen, reward, onClose }: CorrectAnswerModalProps) => {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setShowConfetti(false)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={200}
              confettiSource={{ x: 0, y: 0, w: width, h: 0 }}
              colors={['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C']}
              gravity={1}
            />
          )}
          <div className="relative flex h-60 flex-col items-center gap-4 text-center">
            <h2 className="text-fs20 font-bold">🎉 정답입니다!</h2>
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
            <p className="text-fs16 border-pri-400 flex h-full w-full items-center justify-center rounded-lg border-2 font-medium">
              <span className="text-fs24 font-bold">{reward.toLocaleString()}원</span>
            </p>
            <p className="text-fs14 text-gray-500">보유 다챠페이에서 확인해보세요.</p>
            <Button
              onClick={onClose}
              text="확인"
              className="bg-pri-500 text-gray-10 text-fs18 w-full font-medium"
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default CorrectAnswerModal
