import client from './client'

interface SortItem {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}

export interface NotificationItem {
  alarmId: number
  content: string
  transactionFeedId: number
  alarmType: {
    alarmTypeId: number
    type: string
  }
  status: {
    statusId: number
    code: string // 'READ' | 'UNREAD'
  }
  createdAt: string
}

export interface NotificationResponse {
  content: NotificationItem[]
  pageable: {
    pageNumber: number
    pageSize: number
  }
  number: number
  size: number
  sort: SortItem[]
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export const getNotifications = async (page: number = 0): Promise<NotificationResponse> => {
  const res = await client.get('/notifications', {
    params: {
      page,
      size: 10,
      sort: 'createdAt,DESC',
    },
  })
  return res.data.data
}
export const markNotificationsAsRead = async (alarmIds: number[]): Promise<void> => {
  await client.post('/notifications/read', {
    alarmIds,
  })
}
