export const modalTexts = {
  delete: {
    title: '선택된 관심거래를 삭제하시겠습니까?',
    description: '삭제하신 관심거래는 복구가 불가능합니다.',
    leftButtonText: '닫기',
    rightButtonText: '삭제하기',
  },
  'delete-all': {
    title: '전체 관심거래를 삭제하시겠습니까?',
    description: '삭제하신 관심거래는 복구가 불가능합니다.',
    leftButtonText: '닫기',
    rightButtonText: '삭제하기',
  },
} as const

export const buttonOptions = {
  fav: [
    { label: '전체', value: 'both' },
    { label: '일반 거래', value: 'deal' },
    { label: '입찰 거래', value: 'bid' },
  ] as const,

  trade: [
    { label: '전체', value: 'both' },
    { label: '구매 내역', value: 'purchase' },
    { label: '판매 내역', value: 'sell' },
  ] as const,
}

export type FavButtonValue = (typeof buttonOptions.fav)[number]['value']
export type TradeButtonValue = (typeof buttonOptions.trade)[number]['value']
