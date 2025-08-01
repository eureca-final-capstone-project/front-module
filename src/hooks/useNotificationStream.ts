import { useNotificationStore } from '../store/notificationStore'
import { useEffect } from 'react'
import { connectNotificationStream } from '../apis/alert'
import { NotificationItem } from '../types/notification'

export function useNotificationStream() {
  const addNotification = useNotificationStore(s => s.addNotification)
  const setDisconnectFn = useNotificationStore(s => s.setDisconnectFn)

  useEffect(() => {
    const token = sessionStorage.getItem('userAccessToken')
    if (!token) return

    const disconnect = connectNotificationStream<NotificationItem>({
      token,
      onMessage: data => {
        addNotification(data)
      },
      onConnect: () => {
        console.log('✅ 알림 스트림 연결됨')
      },
      onError: e => {
        console.error('❌ SSE 에러', e)
      },
    })

    // Zustand에 disconnectFn 저장 (로그아웃할 때 수동 호출)
    setDisconnectFn(disconnect)
  }, [addNotification, setDisconnectFn])
}
