export type SalesType = 'normal' | 'bid'

/**
 * 서버에서 받은 한글 salesType을 내부 코드용 영문으로 매핑
 * @param type 서버 응답값 ('일반 판매' | '입찰 판매')
 * @returns 'normal' | 'bid'
 */
export const mapSalesTypeFromServer = (type: string): SalesType => {
  switch (type) {
    case '일반 판매':
      return 'normal'
    case '입찰 판매':
      return 'bid'
    default:
      throw new Error(`Unknown salesType from server: ${type}`)
  }
}

/**
 * 내부 코드에서 사용하는 salesType을 UI 출력용 한글로 변환
 * @param type 'normal' | 'bid'
 * @returns '일반 거래' | '입찰 거래'
 */
export const getSalesTypeLabel = (type: SalesType): string => {
  switch (type) {
    case 'normal':
      return '일반 거래'
    case 'bid':
      return '입찰 거래'
  }
}
