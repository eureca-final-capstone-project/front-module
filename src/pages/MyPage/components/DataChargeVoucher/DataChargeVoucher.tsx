import Badge from '../../../../components/Badge/Badge'

const DataChargeVoucher = () => {
  return (
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
        className="bg-coupon-gradation-mb relative flex h-full w-full rounded-md"
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
            <h2 className="text-fs28 md:text-fs32 font-semibold">200</h2>
            <p className="text-fs14 md:text-fs16 -mt-1 font-medium">MB</p>
          </div>
        </div>

        <div className="bg-opacity-90 bg-gray-10 flex flex-1 flex-col justify-between p-4 text-right">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex gap-1">
              <Badge size="small" className="bg-lguplus w-fit leading-[100%]" label="LG U+" />
              <h2 className="text-fs16 md:text-fs20 font-medium">데이터 충전권</h2>
            </div>
            <p className="text-fs12 md:text-fs14 text-pri-600">XYWSD_DFJADS-KDF</p>
          </div>
          <p className="text-fs12 text-gray-500">유효기간 | 2025년 7월 8일 24:00</p>
        </div>
      </div>
    </div>
  )
}

export default DataChargeVoucher
