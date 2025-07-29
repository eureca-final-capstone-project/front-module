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

/**
 * 문자열로 된 숫자를 받아서,
 * 기존에 포함된 콤마(,)를 제거하고,
 * 유효한 숫자인 경우 천 단위 구분 쉼표(,)가 포함된 문자열로 변환하여 반환
 * 유효하지 않은 숫자면 빈 문자열을 반환
 *
 * 예) "10000" -> "10,000"
 * 예) "1,0000" -> "10,000"
 * 예) "abc" -> ""
 *
 */
export const formatNumberWithComma = (value: string) => {
  if (!value) return ''
  const numStr = value.replace(/,/g, '')
  if (isNaN(Number(numStr))) return ''
  return Number(numStr).toLocaleString('ko-KR')
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

/* 계좌 번호 하이픈 자동 삽입 함수 */
export const formatAccountNumber = (value: string) => {
  const onlyDigits = value.replace(/\D/g, '')

  // 최대 12자리
  const sliced = onlyDigits.slice(0, 12)

  const parts = []
  if (sliced.length <= 3) {
    parts.push(sliced)
  } else if (sliced.length <= 6) {
    parts.push(sliced.slice(0, 3), sliced.slice(3))
  } else if (sliced.length <= 10) {
    parts.push(sliced.slice(0, 3), sliced.slice(3, 6), sliced.slice(6))
  } else {
    parts.push(sliced.slice(0, 3), sliced.slice(3, 6), sliced.slice(6, 10), sliced.slice(10))
  }

  return parts.join('-')
}

/* 계좌 번호 하이픈 자동 제거 함수 */
export const stripAccountNumber = (value: string) => value.replace(/\D/g, '').slice(0, 12)
