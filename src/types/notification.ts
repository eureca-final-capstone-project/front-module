export interface NotificationItem {
  alarmId: number
  content: string
  transactionFeedId: number
  alarmType: {
    alarmTypeId: number
    type: string
  }
  salesType: string
  status: {
    statusId: number
    code: string // 'READ' | 'UNREAD'
  }
  createdAt: string
}
