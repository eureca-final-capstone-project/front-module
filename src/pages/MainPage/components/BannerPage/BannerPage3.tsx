import BannerHeader from './BannerHeader'
import NoticeIcon from '@/assets/icons/notice.svg?react'
import { useEffect, useRef, useState } from 'react'
import { useDeviceType } from '../../../../hooks/useDeviceType'
import Button from '../../../../components/Button/Button'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getQuizData, postQuizStatus } from '../../../../apis/quiz'
import { useToast } from '../../../../hooks/useToast'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
import { useAuthStore } from '../../../../store/authStore'
import HintModal from './HintModal'
import CorrectAnswerModal from './CorrectAnswerModal'
import WrongAnswerModal from './WrongAnswerModal'

const BannerPage3 = () => {
  const { showToast } = useToast()
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const textRef = useRef<HTMLDivElement>(null)
  const [isMultiLine, setIsMultiLine] = useState(false)
  const [quizInput, setQuizInput] = useState('')
  const [isHintModalOpen, setIsHintModalOpen] = useState(false)
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false)
  const [isWrongModalOpen, setIsWrongModalOpen] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)

  const isLoggedIn = useAuthStore(state => state.isLogin)

  // 퀴즈 데이터 가져오기
  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz'],
    queryFn: getQuizData,
  })

  // 퀴즈 정답 제출
  const { mutate: submitAnswer, isPending } = useMutation({
    mutationFn: (quizId: number) => postQuizStatus(quizId),
    onSuccess: data => {
      setRewardAmount(data.reward)
      setIsCorrectModalOpen(true)
    },
  })

  const handleSubmit = () => {
    if (!isLoggedIn) {
      showToast({ type: 'default', msg: '로그인 후 참여 가능합니다.' })
      return
    }

    if (!quizData) {
      showToast({ type: 'error', msg: '퀴즈 정보를 불러오지 못했어요.' })
      return
    }

    const userAnswer = quizInput.trim()
    const correctAnswer = quizData.quizAnswer.trim()

    if (userAnswer === '') {
      showToast({ type: 'default', msg: '정답을 입력해주세요.' })
      return
    }

    const handleServerError = (error: unknown) => {
      if (error instanceof Error) {
        if (error.message.includes('이미 참여')) {
          showToast({
            type: 'error',
            msg: '이미 오늘의 퀴즈에 참여하셨습니다. 내일 다시 도전해보세요!',
          })
        } else {
          setIsWrongModalOpen(true)
        }
      } else {
        showToast({
          type: 'error',
          msg: '예기치 못한 오류가 발생했어요. 다시 시도해주세요.',
        })
      }
    }

    if (userAnswer === correctAnswer) {
      submitAnswer(quizData.quizId, {
        onError: handleServerError,
      })
    } else {
      setIsWrongModalOpen(true)
    }

    setQuizInput('')
  }

  const quizBottomValue = isMobile
    ? isMultiLine
      ? 'bottom-[36%]'
      : 'bottom-[38%]'
    : isMultiLine
      ? 'bottom-[38%]'
      : 'bottom-[40%]'

  const answerBottomValue = isMobile ? 'bottom-[20%]' : ' bottom-[21.5%]'

  const submitBottomValue = isMobile ? 'bottom-[10%]' : ' bottom-[13%]'

  const isSubmitDisabled = isPending || quizInput.trim() === ''

  useEffect(() => {
    const el = textRef.current
    if (!el || !quizData?.quizTitle) return

    const timeout = setTimeout(() => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      const lines = el.offsetHeight / lineHeight
      setIsMultiLine(lines > 1)
    }, 0)

    return () => clearTimeout(timeout)
  }, [quizData])

  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-160 flex-col">
        <BannerHeader title="[오늘의 퀴즈 풀고 페이 받기 이벤트]" />
        <div className="relative sm:mt-6">
          <img
            src="/images/banners/banner3-detail.png"
            alt="오늘의 퀴즈 이벤트"
            className="w-full object-cover"
          />
          <div
            className={`absolute right-0 left-0 flex items-center justify-center pb-6 ${quizBottomValue}`}
          >
            <div
              ref={textRef}
              className="text-fs16 sm:text-fs24 flex w-[72%] items-start justify-center gap-1 text-center leading-tight font-semibold"
            >
              {isLoading ? (
                <LoadingSpinner className="text-fs14 font-medium" text="질문 가져오는 중..." />
              ) : (
                <>
                  <p>Q.</p>
                  <span>{quizData?.quizTitle}</span>
                </>
              )}
            </div>
          </div>
          <div className={`absolute right-0 left-0 flex justify-center ${answerBottomValue}`}>
            <input
              className={`bg-gray-10 border-pri-500 w-[68%] items-center rounded-full border-3 px-4 py-2 placeholder-gray-400 focus:outline-none sm:py-3`}
              id="quiz"
              type="text"
              value={quizInput}
              placeholder="정답을 입력해주세요!"
              onChange={e => setQuizInput(e.target.value)}
            />
          </div>
          <div
            className={`absolute right-0 left-0 flex justify-center gap-3 ${submitBottomValue} flex items-center`}
          >
            <Button
              text="힌트보기"
              className="bg-gray-10 sm:text-fs18 text-pri-600 w-25 sm:w-30 sm:font-medium"
              onClick={() => setIsHintModalOpen(true)}
            />
            <Button
              text={isPending ? '제출 중...' : '제출하기'}
              className={`${isSubmitDisabled ? 'button-disabled border-pri-600' : 'bg-pri-600 text-gray-10 border-1'} sm:text-fs18 w-25 sm:w-30 sm:font-medium`}
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            />
          </div>
        </div>

        {/* 힌트 모달 */}
        <HintModal
          isOpen={isHintModalOpen}
          onClose={() => setIsHintModalOpen(false)}
          hintContent={quizData?.quizHint || ''}
        />
        {/* 정답 모달 */}
        <CorrectAnswerModal
          isOpen={isCorrectModalOpen}
          reward={rewardAmount}
          onClose={() => setIsCorrectModalOpen(false)}
        />
        {/* 오답 모달 */}
        <WrongAnswerModal isOpen={isWrongModalOpen} onClose={() => setIsWrongModalOpen(false)} />
        <div className="mb-10 bg-gray-50 p-6">
          {/* 참여 방법 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">[랜덤 페이 지급 이벤트 참여 방법]</h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 pt-4 pb-12 text-gray-800">
            <div className="mb-2 flex items-start gap-1 font-medium sm:items-center">
              <NoticeIcon />
              <p>
                매일 퀴즈 풀고,
                <strong className="text-gray-900"> 최대 100만 원의 랜덤 페이</strong>를 받아 데이터
                거래에 활용해 보세요!
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>1. </p>
              <p>퀴즈를 풀고 정답을 제출합니다.</p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>2. </p>
              <p>
                정답을 맞히면
                <strong className="text-gray-900"> 1원부터 1,000,000원</strong>의 사이의 랜덤 페이가
                즉시 지급됩니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>3. </p>
              <p>
                지급된 페이는
                <strong className="text-gray-900"> 보유 다챠페이 정보</strong>에서 확인 가능하며,
                <strong className="text-gray-900"> 데이터 거래 시 구매</strong>하실 때 사용할 수
                있습니다.
              </p>
            </div>
          </div>
          {/* 이벤트 유의사항 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">[이벤트 유의사항]</h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 py-4 text-gray-800">
            <div className="flex gap-1 font-medium">
              <p>- </p>
              <p>
                본 이벤트는 정답을 맞힐 때까지 여러 번 참여할 수 있으며, 1일 1회 정답 제출 시 참여가
                완료됩니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                지급된 페이는 <strong className="text-gray-900">데이터 구매 시 </strong>
                현금처럼 사용할 수 있습니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                페이 지급 금액은{' '}
                <strong className="text-gray-900">1원부터 1,000,000원 사이에서 랜덤</strong>으로
                결정됩니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>본 이벤트는 당사 사정에 따라 예고 없이 변경되거나 조기 종료될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerPage3
