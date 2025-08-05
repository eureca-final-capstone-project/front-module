import { useNotificationStore } from '../store/notificationStore'
import { useEffect } from 'react'
import { connectNotificationStream } from '../apis/alert'
import { NotificationItem } from '../types/notification'
import { useQueryClient } from '@tanstack/react-query'

export function useNotificationStream() {
  const addNotification = useNotificationStore(s => s.addNotification)
  const setDisconnectFn = useNotificationStore(s => s.setDisconnectFn)
  const queryClient = useQueryClient()

  useEffect(() => {
    const disconnect = connectNotificationStream<NotificationItem>({
      onMessage: data => {
        addNotification(data)
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
      },
      onConnect: () => {},
      onError: e => {
        console.error('SSE 에러 발생:', e)
      },
    })

    // Zustand에 disconnectFn 저장 (로그아웃할 때 수동 호출)
    setDisconnectFn(disconnect)
  }, [addNotification, setDisconnectFn, queryClient])
}
