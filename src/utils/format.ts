/* 데이터 용량 단위 변환 함수
 *
 * 1000MB 이상: GB 단위로 환산 + 소수점 한 자리까지 반올림한 문자열 반환
 * 1000MB 미만: MB 단위 문자열 반환
 * 단위(MB, GB) 붙여서 반환
 */
export const formatDataSize = (mb: number): string => {
  if (mb >= 1000) {
    const gb = mb / 1000
    return Number.isInteger(gb) ? `${gb}GB` : `${gb.toFixed(1)}GB`
  }
  return `${mb}MB`
}

/* 금액 포맷팅 함수
 *
 * 천 단위 구분 쉼표 포함된 문자열로 변환
 * '원' 붙여서 반환
 *
 */
export const formatAmount = (amount: number): string => {
  return `${amount.toLocaleString()}원`
}

/* 휴대폰 번호 하이픈 자동 삽입 함수 */
export const formatPhoneNumber = (value: string) => {
  const number = value.replace(/[^0-9]/g, '')

  if (number.length <= 3) return number
  if (number.length <= 7) {
    return `${number.slice(0, 3)}-${number.slice(3)}`
  }
  return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7, 11)}`
}
