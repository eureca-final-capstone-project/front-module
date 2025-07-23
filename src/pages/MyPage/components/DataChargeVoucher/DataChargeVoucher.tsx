import { DataCoupon } from '../../../../apis/dataVoucher'
import ScaleDownMotion from '../../../../components/Animation/ScaleDownMotion'
import Badge from '../../../../components/Badge/Badge'
import { formatDataSize } from '../../../../utils/format'
import { getTelecomBadgeColor } from '../../../../utils/telecom'

interface Props {
  coupon: DataCoupon
}

const DataChargeVoucher = ({ coupon }: Props) => {
  const { couponNumber, dataAmount, telecomCompany, expiresAt } = coupon
  const formatted = formatDataSize(dataAmount)
  const [value, unit] = formatted.match(/^([\d.]+)([a-zA-Z]+)$/)?.slice(1) || []

  return (
    <ScaleDownMotion>
      <div className="relative mx-auto h-40 w-full">
        {/* 그림자 역할 카드 */}
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

        {/* 실제 카드 */}
        <div
          className="bg-coupon-gradation-mb relative flex h-full w-full cursor-pointer rounded-md"
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

          <div className="bg-opacity-90 bg-gray-10 flex flex-1 flex-col justify-between p-4 text-right">
            <div className="flex flex-col gap-2 text-left">
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
            <p className="text-fs12 text-gray-500">
              유효기간 | {new Date(expiresAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </ScaleDownMotion>
  )
}

export default DataChargeVoucher
