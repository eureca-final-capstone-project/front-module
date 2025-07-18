import { ToastContainer, Bounce } from 'react-toastify'
import SuccessIcon from '../../assets/icons/toast-success.svg?react'
import ErrorIcon from '../../assets/icons/toast-error.svg?react'

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      pauseOnHover={false}
      draggable={false}
      closeButton={false}
      theme="light"
      transition={Bounce}
      limit={1}
      toastClassName={context =>
        [
          'bg-gray-10',
          'shadow-toast',
          'rounded-full sm:rounded-sm',
          'p-4',
          'h-13',
          'min-w-80',
          'flex items-center justify-center relative',
          context?.type === 'error' ? 'text-error' : 'text-gray-900',
          'text-fs16',
          'font-regular',
          'text-center',
        ]
          .filter(Boolean)
          .join(' ')
      }
      icon={context => {
        if (context?.type === 'success') return <SuccessIcon />
        if (context?.type === 'error') return <ErrorIcon />
        return undefined
      }}
    />
  )
}

export default Toast
