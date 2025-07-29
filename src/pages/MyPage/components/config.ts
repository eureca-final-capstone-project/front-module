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
  'data-purchase': {
    title: '데이터 거래를 진행하시겠습니까?',
    description: '거래하신 데이터는 충전권으로 발급되며 환불이 불가합니다.',
    leftButtonText: '닫기',
    rightButtonText: '거래하기',
  },
  'pay-refund': {
    title: '페이를 환전하시겠습니까?',
    description: '환전 후 입력 계좌로 환전된 금액이 입급됩니다.',
    leftButtonText: '닫기',
    rightButtonText: '환전하기',
  },
} as const

export const buttonOptions = {
  fav: [
    { label: '전체', value: 'all' },
    { label: '일반 거래', value: 'normal' },
    { label: '입찰 거래', value: 'bid' },
  ] as const,

  trade: [
    { label: '전체', value: 'ALL' },
    { label: '구매 내역', value: 'PURCHASE' },
    { label: '판매 내역', value: 'SALE' },
  ] as const,
}

export type FavButtonValue = (typeof buttonOptions.fav)[number]['value']
export type TradeButtonValue = (typeof buttonOptions.trade)[number]['value']

export const passwordFields = [
  {
    name: 'currentPassword' as const,
    label: '기존 비밀번호',
    placeholder: '기존 비밀번호를 입력해주세요',
  },
  {
    name: 'newPassword' as const,
    label: '새 비밀번호',
    placeholder: '영문, 숫자, 특수문자 조합 8-16자',
  },
  {
    name: 'confirmPassword' as const,
    label: '새 비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해주세요',
  },
] as const
