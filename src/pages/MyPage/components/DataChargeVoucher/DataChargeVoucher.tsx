import { useMutation } from '@tanstack/react-query'
import { DataCoupon, postUseDataCoupon } from '../../../../apis/dataVoucher'
import ScaleDownMotion from '../../../../components/Animation/ScaleDownMotion'
import Badge from '../../../../components/Badge/Badge'
import { formatDataSize } from '../../../../utils/format'
import { getTelecomBadgeColor } from '../../../../utils/telecom'
import { useToast } from '../../../../hooks/useToast'

interface Props {
  coupon: DataCoupon
}

const DataChargeVoucher = ({ coupon }: Props) => {
  const { couponNumber, dataAmount, telecomCompany, expiresAt, userDataCouponId, status } = coupon
  const formatted = formatDataSize(dataAmount)
  const [value, unit] = formatted.match(/^([\d.]+)([a-zA-Z]+)$/)?.slice(1) || []
  const { showToast } = useToast()

  const { mutate, status: mutationStatus } = useMutation<void, Error, void>({
    mutationFn: () => postUseDataCoupon(userDataCouponId),
    onSuccess: () => {
      showToast({ type: 'success', msg: '데이터 충전권이 구매 데이터로 전환되었습니다.' })
    },
    onError: () => {
      showToast({ type: 'error', msg: '데이터 충전에 실패했습니다.' })
    },
  })

  const isUsed = status.code === 'USED'
  const isExpired = status.code === 'EXPIRED'

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
              mutate()
            }
          }}
          className={`bg-coupon-gradation-mb relative flex h-full w-full rounded-md ${
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
          <div className="text-gray-10 flex w-1/3 items-center bg-transparent p-4">
            <div className="-gap-1 flex w-full flex-col text-right">
              <h2 className="text-fs28 md:text-fs32 font-semibold">{value}</h2>
              <p className="text-fs14 md:text-fs16 -mt-1 font-medium">{unit}</p>
            </div>
          </div>

          <div
            className={`relative flex flex-1 flex-col justify-between p-4 text-right ${
              isUsed || isExpired
                ? 'bg-modal-background backdrop-blur-sm'
                : 'bg-opacity-90 bg-gray-10'
            }`}
          >
            {/* 기존 내용은 상태에 따라 투명 처리 */}
            <div
              className={`flex flex-col gap-2 text-left ${isUsed || isExpired ? 'opacity-30' : ''}`}
            >
              <div className="flex gap-1">
                <Badge
                  size="small"
                  className={`${getTelecomBadgeColor(telecomCompany.name)} w-fit leading-none`}
                  label={telecomCompany.name}
                />
                <h2 className="text-fs16 md:text-fs20 font-medium">데이터 충전권</h2>
              </div>
              <p className="text-fs12 md:text-fs14 text-pri-600">{couponNumber}</p>
            </div>
            <p className={`text-fs12 text-gray-500 ${isUsed || isExpired ? 'opacity-30' : ''}`}>
              유효기간 | {new Date(expiresAt).toLocaleString('ko-KR')}
            </p>

            {/* 상태 텍스트 오버레이 */}
            {(isUsed || isExpired) && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-gray-10 text-fs20 font-medium select-none">
                  {isUsed ? '사용 완료' : '기간 만료'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScaleDownMotion>
  )
}

export default DataChargeVoucher
