import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import FailIcon from '@/assets/icons/delete.svg?react'

const PaymentFailPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-[calc(100vh-88px)] flex-col justify-between px-4 pb-4 sm:h-[calc(100vh-126px)] sm:px-0 sm:pb-10">
      <div className="flex items-center">
        <Card className="flex flex-1 flex-col justify-center gap-5 p-4 text-center sm:gap-8 sm:px-5 sm:py-20.25">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="bg-error-light flex h-14 w-14 items-center justify-center rounded-full">
              <FailIcon className="text-error h-7 w-7" />
            </div>
            <h3 className="sm:text-fs24">페이 충전에 실패하였습니다.</h3>
          </div>
          <p className="text-fs14 sm:text-fs18 text-gray-800">다시 시도해주세요.</p>
        </Card>
      </div>

      <Button
        text="메인 페이지로 이동하기"
        onClick={() => navigate('/')}
        className="text-pri-500 border-pri-500 text-fs18 lg:text-fs20 w-full border-2 font-medium"
      />
    </div>
  )
}

export default PaymentFailPage
