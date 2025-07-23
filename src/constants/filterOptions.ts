export const TELECOMCOMPANY_OPTIONS = ['KT', 'LG U+', 'SKT'] as const

export const SALES_TYPE_OPTIONS = ['일반 판매', '입찰 판매'] as const

export const STATUS_OPTIONS = [
  { label: '진행 거래', value: 'ON_SALE' },
  { label: '완료 거래', value: 'COMPLETED' },
  { label: '기간 만료 거래', value: 'EXPIRED' },
] as const

export const SALES_DATA_AMOUNT_OPTIONS = [
  { label: '500MB 이하', minDataAmount: 0, maxDataAmount: 500 },
  { label: '500MB 이상 1GB 이하', minDataAmount: 500, maxDataAmount: 1000 },
  { label: '1GB 이상 2GB 이하', minDataAmount: 1000, maxDataAmount: 2000 },
] as const

export const PRICE_OPTIONS = [
  { label: '3,000원 이하', minPrice: 0, maxPrice: 3000 },
  { label: '5,000원 이하', minPrice: 0, maxPrice: 5000 },
  { label: '10,000원 이하', minPrice: 0, maxPrice: 10000 },
  { label: '20,000원 이하', minPrice: 0, maxPrice: 20000 },
] as const
