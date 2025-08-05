import { useRef } from 'react'
import { toast, ToastOptions } from 'react-toastify'

interface ToastProps {
  msg?: string
  type: 'default' | 'success' | 'error' | 'promise'
  customOptions?: ToastOptions
  promiseMessages?: {
    pending?: string
    success?: string
    error?: string
  }
  promiseFn?: Promise<unknown>
  icon?: boolean
}

export const useToast = () => {
  const isToastVisible = useRef(false)

  const showToast = ({
    msg,
    type = 'default',
    customOptions,
    promiseMessages,
    promiseFn,
  }: ToastProps) => {
    if (isToastVisible.current) return

    const options: ToastOptions = {
      ...customOptions,
      onOpen: () => {
        isToastVisible.current = true
      },
      onClose: () => {
        isToastVisible.current = false
      },
    }

    switch (type) {
      case 'success':
        toast.success(msg, options)
        break
      case 'error':
        toast.error(msg, options)
        break
      case 'promise':
        if (!promiseFn) {
          return
        }
        toast.promise(
          promiseFn,
          {
            pending: {
              render: () => promiseMessages?.pending || '처리 중...',
            },
            success: {
              render: () => promiseMessages?.success || '성공했습니다.',
            },
            error: {
              render: () => promiseMessages?.error || '에러가 발생했습니다.',
            },
          },
          {
            ...customOptions,
            onOpen: () => {
              isToastVisible.current = true
            },
            onClose: () => {
              isToastVisible.current = false
            },
          }
        )
        break
      default:
        toast(msg, options)
    }
  }

  return { showToast }
}
