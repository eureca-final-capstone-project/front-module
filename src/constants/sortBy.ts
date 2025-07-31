export const SORT_BY = [
  { label: '최신순', value: 'LATEST' },
  { label: '가격 높은 순', value: 'PRICE_HIGH' },
  { label: '가격 낮은 순', value: 'PRICE_LOW' },
] as const

export type SortLabel = (typeof SORT_BY)[number]['label']

export const MYPAGE_SORT = [
  { label: '최신순', value: 'createdAt,desc' },
  { label: '가격 높은 순', value: 'salesPrice,desc' },
  { label: '가격 낮은 순', value: 'salesPrice,asc' },
] as const

export type MyPageSortLabel = (typeof MYPAGE_SORT)[number]['label']
export type MyPageSortValue = (typeof MYPAGE_SORT)[number]['value']
