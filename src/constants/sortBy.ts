export const SORT_BY = [
  { label: '최신순', value: 'LATEST' },
  { label: '가격 높은 순', value: 'PRICE_HIGH' },
  { label: '가격 낮은 순', value: 'PRICE_LOW' },
] as const

export type SortLabel = (typeof SORT_BY)[number]['label']
