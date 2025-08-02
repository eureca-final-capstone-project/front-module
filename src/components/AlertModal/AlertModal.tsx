// AlertModal.tsx
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { getNotifications, markNotificationsAsRead, NotificationItem } from '../../apis/alert'
// import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useNotificationStore } from '../../store/notificationStore'
import AlertMobile from './AlertMobile'
import AlertDesktop from './AlertDesktop'
import SwipeableSlide from '../Animation/SwipeableSlide'

interface AlertModalProps {
  isOpen: boolean
  onClose?: () => void
}

const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
  const queryClient = useQueryClient()
  // const navigate = useNavigate()
  const isLoggedIn = useAuthStore(state => state.isLogin)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [hasShownCompleteMessage, setHasShownCompleteMessage] = useState(false)
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const setHasUnread = useNotificationStore(s => s.setHasUnread)
  const [isVisible, setIsVisible] = useState(isOpen)

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage.last ? undefined : lastPage.number + 1),
  })

  const flattenedNotifications: NotificationItem[] = data?.pages.flatMap(page => page.content) ?? []
  const shouldShowCompleteMessage = hasReachedBottom && !hasNextPage && !isFetchingNextPage

  useEffect(() => {
    if (isLoggedIn) {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (shouldShowCompleteMessage && !hasShownCompleteMessage) {
      setHasShownCompleteMessage(true)
    }
  }, [shouldShowCompleteMessage])

  const markReadMutation = useMutation({
    mutationFn: (ids: number[]) => markNotificationsAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  useEffect(() => {
    if (isOpen) setIsVisible(true)
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }
  const handleMarkAllAsRead = () => {
    const allIds =
      data?.pages.flatMap(p =>
        p.content.filter(n => n.status.code === 'UNREAD').map(n => n.alarmId)
      ) || []
    if (allIds.length > 0) {
      markReadMutation.mutate(allIds, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] })
          setHasUnread(false)

          setTimeout(() => {
            onClose?.()
          }, 600)
        },
      })
    }
  }

  const handleReadOne = useCallback(
    (alarmId: number) => {
      markReadMutation.mutate([alarmId], {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] })

          const remaining = flattenedNotifications.some(
            n => n.status.code === 'UNREAD' && n.alarmId !== alarmId
          )
          setHasUnread(remaining)
          onClose?.()
        },
      })
    },
    [markReadMutation, queryClient, flattenedNotifications, setHasUnread]
  )

  const handleNotificationScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 44
    setHasReachedBottom(isBottom)

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (!isOpen && !isVisible) return null

  if (!isLoggedIn) {
    return isMobile ? <AlertMobile.LoginView onClose={handleClose} /> : <AlertDesktop.LoginView />
  }

  return isMobile ? (
    <SwipeableSlide isOpen={isOpen} onClose={onClose}>
      <AlertMobile.NotificationView
        notifications={flattenedNotifications}
        onRead={handleReadOne}
        onMarkAllAsRead={handleMarkAllAsRead}
        onScroll={handleNotificationScroll}
        isFetchingNextPage={isFetchingNextPage}
        shouldShowCompleteMessage={shouldShowCompleteMessage || hasShownCompleteMessage}
        onClose={onClose}
      />
    </SwipeableSlide>
  ) : (
    <AlertDesktop.NotificationView
      notifications={flattenedNotifications}
      onRead={handleReadOne}
      onMarkAllAsRead={handleMarkAllAsRead}
      onScroll={handleNotificationScroll}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      shouldShowCompleteMessage={shouldShowCompleteMessage}
      onClose={onClose}
    />
  )
}

export default AlertModal
