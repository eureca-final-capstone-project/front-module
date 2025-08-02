import { useNotificationStore } from '../store/notificationStore'
import { connectNotificationStream } from '../apis/alert'
import { NotificationItem } from '../types/notification'

export const reconnectNotificationStream = () => {
  const { disconnectFn, setDisconnectFn, addNotification } = useNotificationStore.getState()

  // 기존 연결 끊고
  disconnectFn?.()

  const disconnect = connectNotificationStream<NotificationItem>({
    onMessage: addNotification,
    onConnect: () => console.log('🔁 로그인 후 SSE 연결됨'),
    onError: e => console.error('❌ SSE 에러', e),
  })

  setDisconnectFn(disconnect)
}
