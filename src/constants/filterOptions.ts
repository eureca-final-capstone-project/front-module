export const TELECOMCOMPANY_OPTIONS: { id: number; label: string }[] = [
  { id: 2, label: 'KT' },
  { id: 3, label: 'LG U+' },
  { id: 1, label: 'SKT' },
]

export const SALES_TYPE_OPTIONS: { id: number; label: string }[] = [
  { id: 1, label: '일반 판매' },
  { id: 2, label: '입찰 판매' },
]

export const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: '진행 거래', value: 'ON_SALE' },
  { label: '완료 거래', value: 'COMPLETED' },
  { label: '기간 만료 거래', value: 'EXPIRED' },
]

export const SALES_DATA_AMOUNT_OPTIONS: {
  label: string
  minDataAmount: number
  maxDataAmount: number
}[] = [
  { label: '500MB 이하', minDataAmount: 0, maxDataAmount: 500 },
  { label: '500MB 이상 1GB 이하', minDataAmount: 500, maxDataAmount: 1000 },
  { label: '1GB 이상 2GB 이하', minDataAmount: 1000, maxDataAmount: 2000 },
]

export const PRICE_OPTIONS: {
  label: string
  minPrice: number
  maxPrice: number
}[] = [
  { label: '3,000원 이하', minPrice: 0, maxPrice: 3000 },
  { label: '5,000원 이하', minPrice: 0, maxPrice: 5000 },
  { label: '10,000원 이하', minPrice: 0, maxPrice: 10000 },
  { label: '20,000원 이하', minPrice: 0, maxPrice: 20000 },
]
