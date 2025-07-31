import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import AlertItem from './AlertItem'
import { useCallback, useEffect, useState } from 'react'
import { getNotifications, markNotificationsAsRead, NotificationItem } from '../../apis/alert'
import FadeInUpMotion from '../Animation/FadeInUpMotion'
import LockedIcon from '@/assets/icons/locked.svg?react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../Button/Button'

const AlertModal = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore(state => state.isLogin)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  useEffect(() => {
    if (isLoggedIn) {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  }, [isLoggedIn])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage.last ? undefined : lastPage.number + 1),
  })

  const markReadMutation = useMutation({
    mutationFn: (ids: number[]) => markNotificationsAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      })
    },
  })

  const handleMarkAllAsRead = () => {
    const allIds =
      data?.pages.flatMap(p =>
        p.content.filter(n => n.status.code === 'UNREAD').map(n => n.alarmId)
      ) || []
    if (allIds.length > 0) {
      markReadMutation.mutate(allIds)
    }
  }

  const handleReadOne = useCallback(
    (alarmId: number) => {
      markReadMutation.mutate([alarmId])
    },
    [markReadMutation]
  )

  if (!isLoggedIn) {
    return (
      <div className="rounded-custom-m shadow-header-modal absolute right-0 z-50 flex h-114 w-89 flex-col overflow-hidden bg-white p-0">
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
          <LockedIcon className="h-10 w-10 text-gray-400" />
          <div>
            <p className="text-fs16 font-semibold text-gray-900">로그인이 필요합니다.</p>
            <p className="text-fs14 mt-1 text-gray-500">
              로그인하고 다차 거래 상황과 소식을
              <br />
              알림으로 받아보세요.
            </p>
          </div>
          <Button
            text="로그인하기"
            className="text-fs14 border-pri-500 text-pri-500 border-[1.7px] px-11 py-3 font-medium"
            onClick={() => navigate('/login')}
          />
        </div>
        <div className="bg-pri-500 h-5" />
      </div>
    )
  }

  const flattenedNotifications: NotificationItem[] = data?.pages.flatMap(page => page.content) ?? []
  const shouldShowCompleteMessage = hasReachedBottom && !hasNextPage && !isFetchingNextPage

  const handleNotificationScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 44
    setHasReachedBottom(isBottom)

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className="rounded-custom-m shadow-header-modal absolute right-0 z-50 flex h-114 w-89 flex-col overflow-hidden bg-white p-0">
      <div className="px-5 py-4 text-right">
        <button
          className="text-fs12 text-gray-600 hover:text-gray-800"
          onClick={handleMarkAllAsRead}
        >
          전체 읽음 처리
        </button>
      </div>

      <div
        className="scrollbar-hide flex flex-1 flex-col overflow-y-auto"
        onScroll={handleNotificationScroll}
      >
        {flattenedNotifications.map((notification, index) => (
          <div key={notification.alarmId}>
            <AlertItem notification={notification} onRead={handleReadOne} />
            {index !== flattenedNotifications.length - 1 && (
              <div className="border-t border-gray-100" />
            )}
          </div>
        ))}
        {isFetchingNextPage && <p className="text-fs14 py-4 text-center">불러오는 중</p>}
      </div>

      <motion.div
        initial={{ height: 20 }}
        animate={{ height: shouldShowCompleteMessage ? 44 : 20 }}
        transition={{ duration: 0.3 }}
        className="bg-pri-500 text-fs12 text-gray-10 relative flex items-center justify-center overflow-hidden text-center"
      >
        {shouldShowCompleteMessage && (
          <FadeInUpMotion custom={0} duration={0.2}>
            <span className="whitespace-nowrap">최근 14일 동안 받은 알림을 모두 확인했습니다.</span>
          </FadeInUpMotion>
        )}
      </motion.div>
    </div>
  )
}

export default AlertModal
