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
  const showToast = ({
    msg,
    type = 'default',
    customOptions,
    promiseMessages,
    promiseFn,
  }: ToastProps) => {
    const options: ToastOptions = {
      ...customOptions,
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
          console.error('promise 타입에는 promiseFn이 필요합니다.')
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
          customOptions
        )
        break
      default:
        toast(msg, options)
    }
  }

  return { showToast }
}
