import type { Meta, StoryObj } from '@storybook/react-vite'
import Toast from '../Toast/Toast'
import { useToast } from '../../hooks/useToast'

const meta: Meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Toast 컴포넌트는 전역 알림을 제공하는 컴포넌트입니다. 다양한 알림 유형을 지원하며, 비동기 처리에 대한 토스트 메시지를 표시할 수 있습니다.',
      },
    },
  },
}

export default meta
type Story = StoryObj

const ToastDemo = () => {
  const { showToast } = useToast()

  const buttonClass = 'px-4 py-2 bg-gray-10 h-10 rounded shadow-button text-fs16 hover:bg-gray-50'

  return (
    <div className="bg-background flex h-100 flex-wrap items-center justify-center gap-4 p-8">
      <button
        className={buttonClass}
        onClick={() => showToast({ msg: '기본 토스트 메세지입니다.', type: 'default' })}
      >
        default
      </button>
      <button
        className={buttonClass}
        onClick={() => showToast({ msg: '성공 토스트 메세지입니다.', type: 'success' })}
      >
        success
      </button>
      <button
        className={buttonClass}
        onClick={() => showToast({ msg: '실패 토스트 메세지입니다.', type: 'error' })}
      >
        error
      </button>
      <button
        className={buttonClass}
        onClick={() =>
          showToast({
            type: 'promise',
            promiseFn: new Promise(res => setTimeout(res, 1500)),
            promiseMessages: {
              pending: '잠시만 기다려주세요...',
              success: '완료되었습니다',
              error: '실패했습니다',
            },
          })
        }
      >
        promise
      </button>
    </div>
  )
}

export const ShowToast: Story = {
  render: () => (
    <>
      <Toast />
      <ToastDemo />
    </>
  ),
}
