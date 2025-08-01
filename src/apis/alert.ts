import { createParser } from 'eventsource-parser'

type EventSourceParserEvent =
  | { type: 'event'; event?: string; data: string }
  | { type: 'reconnect-interval'; value: number }

export function connectNotificationStream<T>({
  token,
  onMessage,
  onConnect,
  onError,
}: {
  token: string
  onMessage: (data: T) => void
  onConnect?: () => void
  onError?: (e: unknown) => void
}) {
  const controller = new AbortController()
  let retryCount = 0
  let isAborted = false

  const connect = async () => {
    try {
      console.log('📡 SSE 연결 시도 중...')
      const res = await fetch(`${import.meta.env.VITE_CLIENT_BASE_URL}/notifications/subscribe`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
            retryCount = 0 // 연결 성공 시 재시도 횟수 초기화
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
        const delay = Math.min(1000 * retryCount, 10000) // 최대 10초 대기
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
