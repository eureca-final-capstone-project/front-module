import { createParser } from 'eventsource-parser'
import client from './client'

type EventSourceParserEvent =
  | { type: 'event'; event?: string; data: string }
  | { type: 'reconnect-interval'; value: number }

export function connectNotificationStream<T>({
  onMessage,
  onConnect,
  onError,
}: {
  onMessage: (data: T) => void
  onConnect?: () => void
  onError?: (e: unknown) => void
}) {
  const controller = new AbortController()
  let retryCount = 0
  let isAborted = false

  const connect = async () => {
    const latestToken = sessionStorage.getItem('userAccessToken')
    console.log('✅ SSE 연결 시작됨:', new Date().toISOString())

    // axios가 자동 재발급 중 연결 끊길 혹시 모를 경우 대비해 1초 후 재연결 시도
    if (!latestToken) {
      console.warn('⚠ accessToken 없음 → 1초 후 재시도 예약')
      if (!isAborted) {
        setTimeout(connect, 1000)
      }
      return
    }

    try {
      console.log('📡 SSE 연결 시도 중...')
      const res = await fetch(`${import.meta.env.VITE_CLIENT_BASE_URL}/notifications/subscribe`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${latestToken}`,
          Accept: 'text/event-stream',
        },
        signal: controller.signal,
      })

      if (!res.body) throw new Error('SSE 응답 body 없음')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      const parser = createParser((event: EventSourceParserEvent) => {
        if (event.type === 'event') {
          if (event.event === 'connect') {
            retryCount = 0
            onConnect?.()
            console.log('✅ SSE 연결 성공')
          } else if (event.event === 'notification') {
            const parsed = JSON.parse(event.data) as T
            console.log('📩 SSE 메시지 수신', parsed)
            onMessage(parsed)
          }
        }
      })

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.warn('⚠ SSE 스트림 종료됨 (done)')
          break
        }

        const chunk = decoder.decode(value)
        console.log('📥 원본 청크:', chunk)

        parser.feed(chunk)
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('❌ SSE 연결 실패:', err)
        onError?.(err)

        retryCount++
        const delay = Math.min(1000 * retryCount, 10000)
        console.log(`🔁 ${delay}ms 후 재연결 시도... (재시도 ${retryCount}회차)`)

        if (!isAborted) {
          setTimeout(connect, delay)
        }
      }
    }
  }

  connect()

  return () => {
    isAborted = true
    controller.abort()
  }
}

// 조회 및 삭제 api
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
