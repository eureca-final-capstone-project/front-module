export type TradeStatus = 'active' | 'completed' | 'expired'

/**
 * 서버에서 내려주는 상태값을 프론트에서 사용하는 상태값으로 변환
 */
export const mapStatusFromServer = (status: string): TradeStatus => {
  switch (status) {
    case 'ON_SALE':
      return 'active'
    case 'EXPIRED':
      return 'expired'
    case 'COMPLETED':
      return 'completed'
    default:
      return 'active' // 기본값 fallback
  }
}

/**
 * 프론트 상태값을 서버 상태값으로 변환
 */
export const mapStatusToServer = (status: TradeStatus): string => {
  switch (status) {
    case 'active':
      return 'ON_SALE'
    case 'expired':
      return 'EXPIRED'
    case 'completed':
      return 'COMPLETED'
  }
}

export const TRANSACTION_HISTORY_STATUS: TradeStatus = 'completed'
