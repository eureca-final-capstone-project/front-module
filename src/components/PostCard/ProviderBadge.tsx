interface ProviderBadgeProps {
  telecomCompany: 'SKT' | 'LG U+' | 'KT'
}

const telecomCompanyStyle = {
  SKT: {
    color: '#3617ce',
    text: 'SKT',
  },
  'LG U+': {
    color: '#e6007e',
    text: 'LG U+',
  },
  KT: {
    color: '#d71826',
    text: 'KT',
  },
}

const ProviderBadge = ({ telecomCompany }: ProviderBadgeProps) => {
  const { color, text } = telecomCompanyStyle[telecomCompany]

  return (
    <svg viewBox="0 0 104 74" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
      {/* SVG 그림자 필터 정의 */}
      <defs>
        <filter id="labelShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="2" floodColor="rgba(0, 0, 0, 0.15)" />
        </filter>
      </defs>

      {/* 삼각형 */}
      <path d="M104 0 L104 74 L0 74 Z" fill={color} filter="url(#labelShadow)" />

      {/* 텍스트 */}
      <text
        x="70%"
        y="75%"
        fill="white"
        fontSize="16"
        fontWeight="medium"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ pointerEvents: 'none' }}
      >
        {text}
      </text>
    </svg>
  )
}

export default ProviderBadge
