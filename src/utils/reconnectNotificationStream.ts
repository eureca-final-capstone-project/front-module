import { useNotificationStore } from '../store/notificationStore'
import { connectNotificationStream } from '../apis/alert'
import { NotificationItem } from '../types/notification'

export const reconnectNotificationStream = () => {
  const token = sessionStorage.getItem('userAccessToken')
  const { disconnectFn, setDisconnectFn, addNotification } = useNotificationStore.getState()

  // 기존 연결이 있으면 끊고
  disconnectFn?.()

  if (token) {
    const disconnect = connectNotificationStream<NotificationItem>({
      token,
      onMessage: addNotification,
      onConnect: () => console.log('🔁 로그인 후 SSE 연결됨'),
      onError: e => console.error('❌ SSE 에러', e),
    })

    setDisconnectFn(disconnect)
  }
}
