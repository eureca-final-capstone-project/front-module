import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { reconnectNotificationStream } from '../../utils/reconnectNotificationStream'
import { useNotificationStore } from '../../store/notificationStore'

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAuthStore(state => state.isLogin)
  const disconnectFn = useNotificationStore(state => state.disconnectFn)

  // 로그인 여부가 true일 때만 연결
  useEffect(() => {
    if (isLogin) {
      reconnectNotificationStream()
    } else {
      // 로그아웃된 경우 연결 해제 (혹시 모를 예외 방지)
      disconnectFn?.()
    }
  }, [isLogin])

  return <>{children}</>
}

export default RootProvider
