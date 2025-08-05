import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, useDragControls } from 'framer-motion'
import AlertItem from './AlertItem'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getNotifications, markNotificationsAsRead, NotificationItem } from '../../apis/alert'
import FadeInUpMotion from '../Animation/FadeInUpMotion'
import LockedIcon from '@/assets/icons/locked.svg?react'
import NotificationIcon from '@/assets/icons/notification.svg?react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../Button/Button'
import { useDeviceType } from '../../hooks/useDeviceType'
import SlideInMotion from '../Animation/SlideInMotion'
import { useNotificationStore } from '../../store/notificationStore'
import { useScrollBlock } from '../../hooks/useScrollBlock'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface AlertModalProps {
  isOpen: boolean
  onClose?: () => void
}

const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore(state => state.isLogin)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [hasShownCompleteMessage, setHasShownCompleteMessage] = useState(false)
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const controls = useDragControls()
  const modalRef = useRef<HTMLDivElement>(null)

  const shouldBlockScroll = useMemo(() => isMobile && isOpen, [isMobile, isOpen])
  useScrollBlock(shouldBlockScroll)

  useEffect(() => {
    if (isLoggedIn) {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  }, [isLoggedIn])

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage.last ? undefined : lastPage.number + 1),
  })

  const flattenedNotifications: NotificationItem[] = data?.pages.flatMap(page => page.content) ?? []
  const shouldShowCompleteMessage = hasReachedBottom && !hasNextPage && !isFetchingNextPage
  const setHasUnread = useNotificationStore(s => s.setHasUnread)

  useEffect(() => {
    if (shouldShowCompleteMessage && !hasShownCompleteMessage) {
      setHasShownCompleteMessage(true)
    }
  }, [shouldShowCompleteMessage])

  const markReadMutation = useMutation({
    mutationFn: (ids: number[]) => markNotificationsAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      })
    },
  })

  useEffect(() => {
    if (!isOpen || isMobile) return

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.()
      }
    }
    const timeout = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, isMobile, onClose])

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

  if (!isOpen) return null

  const handleNotificationScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 44
    setHasReachedBottom(isBottom)

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  type QueryStatus = 'pending' | 'error' | 'success'

  const renderStatusFallback = (status: QueryStatus, hasData: boolean) => {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (status === 'pending') {
      title = '알림을 불러오는 중입니다'
    } else if (status === 'error') {
      title = '알림을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else if (status === 'success' && !hasData) {
      title = '최근 14일 이내 받은 알림이 없습니다'
      subtitle = (
        <div className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          <span>거래를 진행하면 알림이 도착해요!</span>
        </div>
      )
    }

    return (
      <div
        className={`flex min-h-[20vh] flex-1 flex-col items-center justify-center px-4 text-center ${textColor}`}
      >
        <NotificationIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  if (isMobile) {
    return (
      <SlideInMotion
        isOpen={isOpen}
        onClose={onClose}
        title="알림"
        controls={controls}
        onContentPointerDown={e => controls.start(e)}
      >
        {isLoggedIn ? (
          <>
            <div className="relative">
              <button
                className="text-fs12 absolute top-6.5 right-4 text-gray-600 hover:text-gray-800"
                onClick={handleMarkAllAsRead}
              >
                전체 읽음 처리
              </button>
            </div>
            <div
              className="mt-16 flex flex-1 flex-col overflow-y-auto"
              onScroll={handleNotificationScroll}
              onPointerDown={e => controls.start(e)}
              style={{ touchAction: 'pan-y' }}
            >
              {status === 'pending' || status === 'error' || flattenedNotifications.length === 0
                ? renderStatusFallback(status, flattenedNotifications.length > 0)
                : flattenedNotifications.map((notification, index) => (
                    <div key={notification.alarmId}>
                      <AlertItem notification={notification} onRead={handleReadOne} />
                      {index !== flattenedNotifications.length - 1 && (
                        <div className="border-t border-gray-100" />
                      )}
                    </div>
                  ))}

              {isFetchingNextPage && (
                <div className="text-fs14 py-4 text-center">
                  <LoadingSpinner />
                </div>
              )}

              {(shouldShowCompleteMessage || hasShownCompleteMessage) && (
                <p className="text-gray-10 bg-pri-500 text-fs14 pt-4 pb-4 text-center">
                  최근 14일 동안 받은 알림을 모두 확인했습니다.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-10 right-10 z-10 text-gray-500"
            ></button>
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
              <LockedIcon className="h-10 w-10 text-gray-400" />
              <div>
                <p className="text-fs16 font-semibold text-gray-900">로그인이 필요합니다.</p>
                <p className="text-fs14 mt-1 text-gray-500">
                  로그인하고 다챠 거래 상황과 소식을
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
          </>
        )}
      </SlideInMotion>
    )
  }
  if (!isMobile && isOpen) {
    return (
      <div
        ref={modalRef}
        className="rounded-custom-m shadow-header-modal absolute right-0 z-50 flex h-114 w-89 flex-col overflow-hidden bg-white p-0"
      >
        {isLoggedIn ? (
          <>
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
              {status === 'pending' || status === 'error' || flattenedNotifications.length === 0
                ? renderStatusFallback(status, flattenedNotifications.length > 0)
                : flattenedNotifications.map((notification, index) => (
                    <div key={notification.alarmId}>
                      <AlertItem notification={notification} onRead={handleReadOne} />
                      {index !== flattenedNotifications.length - 1 && (
                        <div className="border-t border-gray-100" />
                      )}
                    </div>
                  ))}

              {status === 'success' &&
                flattenedNotifications.map((notification, index) => (
                  <div key={notification.alarmId}>
                    <AlertItem notification={notification} onRead={handleReadOne} />
                    {index !== flattenedNotifications.length - 1 && (
                      <div className="border-t border-gray-100" />
                    )}
                  </div>
                ))}
              {isFetchingNextPage && (
                <p className="text-fs14 py-4 text-center">
                  <LoadingSpinner />
                </p>
              )}
            </div>

            <motion.div
              initial={{ height: 20 }}
              animate={{ height: shouldShowCompleteMessage ? 44 : 20 }}
              transition={{ duration: 0.3 }}
              className="bg-pri-500 text-fs12 text-gray-10 relative flex items-center justify-center overflow-hidden text-center"
            >
              {shouldShowCompleteMessage && (
                <FadeInUpMotion custom={0} duration={0.2}>
                  <span className="whitespace-nowrap">
                    최근 14일 동안 받은 알림을 모두 확인했습니다.
                  </span>
                </FadeInUpMotion>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
              <LockedIcon className="h-10 w-10 text-gray-400" />
              <div>
                <p className="text-fs16 font-semibold text-gray-900">로그인이 필요합니다.</p>
                <p className="text-fs14 mt-1 text-gray-500">
                  로그인하고 다챠 거래 상황과 소식을
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
          </>
        )}
      </div>
    )
  }
}

export default AlertModal
