import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DataCoupon, postUseDataCoupon } from '../../../../apis/dataVoucher'
import ScaleDownMotion from '../../../../components/Animation/ScaleDownMotion'
import Badge from '../../../../components/Badge/Badge'
import { formatDataSize } from '../../../../utils/format'
import { getTelecomBadgeColor } from '../../../../utils/telecom'
import { useToast } from '../../../../hooks/useToast'
import { formatCompactDate } from '../../../../utils/time'
import { useState } from 'react'
import BasicModal from '../Modal/BasicModal'

interface Props {
  coupon: DataCoupon
}

const DataChargeVoucher = ({ coupon }: Props) => {
  const { couponNumber, dataAmount, telecomCompany, expiresAt, userDataCouponId, status } = coupon
  const formatted = formatDataSize(dataAmount)
  const [value, unit] = formatted.match(/^([\d.]+)([a-zA-Z]+)$/)?.slice(1) || []
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const { mutate, status: mutationStatus } = useMutation<void, Error, number>({
    mutationFn: couponId => postUseDataCoupon(couponId),
    onSuccess: () => {
      showToast({ type: 'success', msg: '데이터 충전권이 구매 데이터로 전환되었습니다.' })
      queryClient.invalidateQueries({ queryKey: ['dataCoupons'] })
    },
    onError: () => {
      showToast({ type: 'error', msg: '데이터 충전에 실패했습니다.' })
    },
  })

  const isUsed = status.code === 'USED'
  const isExpired = status.code === 'EXPIRED'
  const bgClass = unit === 'GB' ? 'bg-coupon-gradation-gb' : 'bg-coupon-gradation-mb'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCouponId(null)
  }

  const handleConfirmCharge = () => {
    if (selectedCouponId !== null) {
      mutate(selectedCouponId)
      closeModal()
    }
  }

  return (
    <ScaleDownMotion disabled={isUsed || isExpired}>
      <div className="relative mx-auto h-40 w-full">
        {/* 그림자 역할 카드 */}
        {!isUsed && !isExpired && (
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.06)',
              filter: 'blur(18px)',
              transform: 'translate(0px, 5px)',
              zIndex: 0,
              WebkitMaskImage: `
    radial-gradient(
      circle at 33.33% 11px,
      transparent 9px,
      rgba(255, 0, 0, 0.5) 11px,
      red 13px
    ),
    linear-gradient(
      transparent 20%, 
      rgba(255, 0, 0, 0.5) 40%, 
      red 60%, 
      rgba(255, 0, 0, 0.5) 80%, 
      transparent 100%
    )
  `,
              WebkitMaskSize: '100%, 4px 16px',
              WebkitMaskRepeat: 'repeat, repeat-y',
              WebkitMaskPosition: '0 -11px, 33.33%',
              WebkitMaskComposite: 'source-out',
              maskComposite: 'subtract',
            }}
          />
        )}

        {/* 실제 카드 */}
        <div
          onClick={() => {
            if (!isUsed && !isExpired && mutationStatus !== 'pending') {
              setSelectedCouponId(userDataCouponId)
              openModal()
            }
          }}
          className={`${bgClass} relative flex h-full w-full rounded-md ${
            isUsed || isExpired ? 'cursor-default' : 'cursor-pointer'
          }`}
          style={{
            WebkitMaskImage: `
        radial-gradient(circle at 33.33% 11px, transparent 11px, red 11.5px),
        linear-gradient(transparent 25%, red 0, red 75%, transparent 0)
      `,
            WebkitMaskSize: '100%, 4px 16px',
            WebkitMaskRepeat: 'repeat, repeat-y',
            WebkitMaskPosition: '0 -11px, 33.33%',
            WebkitMaskComposite: 'source-out',
            maskComposite: 'subtract',
            zIndex: 1,
          }}
        >
          <div
            className={`text-gray-10 flex w-1/3 items-center p-4 ${
              isUsed || isExpired ? 'bg-gray-300' : 'bg-transparent'
            }`}
          >
            <div className="-gap-1 flex w-full flex-col text-right">
              <h2 className="text-fs28 md:text-fs32 font-semibold">{value}</h2>
              <p className="text-fs14 md:text-fs16 -mt-1 font-medium">{unit}</p>
            </div>
          </div>

          <div
            className={`relative flex flex-1 flex-col justify-between p-4 text-right ${
              isUsed || isExpired ? 'bg-gray-100 backdrop-blur-sm' : 'bg-opacity-90 bg-gray-10'
            }`}
          >
            {/* 기존 내용은 상태에 따라 투명 처리 */}
            <div
              className={`flex flex-col gap-2 text-left ${isUsed || isExpired ? 'opacity-30' : ''}`}
            >
              <div className="flex gap-1">
                <Badge
                  size="small"
                  className={`w-fit leading-none ${
                    isUsed || isExpired
                      ? 'bg-gray-500 text-gray-50'
                      : getTelecomBadgeColor(telecomCompany.name)
                  }`}
                  label={telecomCompany.name}
                />
                <h2 className="text-fs16 md:text-fs20 font-medium">데이터 충전권</h2>
              </div>
              <p
                className={`text-fs12 md:text-fs14 ${
                  isUsed || isExpired ? 'text-gray-400' : 'text-pri-600'
                }`}
              >
                {couponNumber}
              </p>
            </div>
            <p className={`text-fs12 text-gray-500 ${isUsed || isExpired ? 'opacity-30' : ''}`}>
              유효기간 | {formatCompactDate(expiresAt, 'text')}
            </p>

            {/* 상태 텍스트 오버레이 */}
            {(isUsed || isExpired) && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-fs22 font-semibold text-gray-600 select-none">
                  {isUsed ? '사용 완료' : '기간 만료'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BasicModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType="data-charge"
          onClickLeft={closeModal}
          onClickRight={handleConfirmCharge}
        />
      )}
    </ScaleDownMotion>
  )
}

export default DataChargeVoucher
