import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Modal from './Modal'
import Button from '../Button/Button'

type ModalCustomProps = Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose' | 'children'>

const ModalExample = ({
  modalProps,
  children,
  buttonLabel = 'Modal Open',
}: {
  modalProps: ModalCustomProps
  children: (onClose: () => void) => React.ReactNode
  buttonLabel?: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="bg-pri-500 shadow-button text-gray-10 rounded-sm p-3"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>
      <Modal {...modalProps} isOpen={open} onClose={() => setOpen(false)}>
        {children(() => setOpen(false))}
      </Modal>
    </>
  )
}

const meta = {
  title: 'Components/Modal',
  component: ModalExample,
  parameters: {
    docs: {
      description: {
        component:
          'Modal 컴포넌트는 화면 중앙 또는 원하는 위치에 띄울 수 있는 컴포넌트입니다.\n\n' +
          'Modal은 ESC 키 또는 배경 클릭으로 닫을 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalExample>

export default meta
type Story = StoryObj<typeof ModalExample>

// 기본 모달
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 위치(가운데 중앙)에 표시되는 모달입니다. 위치 및 크기 조절 없이 사용됩니다.',
      },
    },
  },
  render: () => (
    <ModalExample modalProps={{}}>
      {onClose => (
        <>
          <div>
            <h2 className="text-fs20 mb-2 font-bold">기본 모달</h2>
            <p>화면 중앙에 표시되는 기본 모달입니다.</p>
          </div>
          <Button text="닫기" onClick={onClose} className="bg-pri-500 text-gray-10 mt-6 w-full" />
        </>
      )}
    </ModalExample>
  ),
}

// 너비 조절 모달
export const CustomWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '모달의 너비를 className을 통해 직접 지정한 예시입니다. 이 예시는 w-100을 적용합니다.',
      },
    },
  },
  render: () => (
    <ModalExample modalProps={{ className: 'w-100' }}>
      {onClose => (
        <>
          <div>
            <h2 className="text-fs20 mb-2 font-bold">너비 400px 모달</h2>
            <p>className으로 너비를 조절할 수 있습니다.</p>
          </div>
          <Button text="닫기" onClick={onClose} className="bg-pri-500 text-gray-10 mt-6 w-full" />
        </>
      )}
    </ModalExample>
  ),
}

// 위치 조절 모달
export const CustomPositioned: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'positionClassName을 이용해 모달을 화면 오른쪽 중앙에 위치시킨 예시입니다. `justify-end`로 오른쪽 정렬합니다.',
      },
    },
  },
  render: () => (
    <ModalExample
      modalProps={{
        positionClassName: 'flex items-center justify-end pr-10',
        className: 'w-100',
      }}
    >
      {onClose => (
        <>
          <div>
            <h2 className="text-fs20 mb-2 font-bold">우측 중앙 모달</h2>
            <p>positionClassName으로 위치를 조절할 수 있습니다.</p>
          </div>
          <Button text="닫기" onClick={onClose} className="bg-pri-500 text-gray-10 mt-6 w-full" />
        </>
      )}
    </ModalExample>
  ),
}

// 스크롤 모달
export const Scroll: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '모달 내부 콘텐츠가 길어질 경우 스크롤이 가능하도록 `max-height`와 `overflow-y-auto`가 적용된 예시입니다.',
      },
    },
  },
  render: () => (
    <ModalExample
      modalProps={{
        className: 'w-150',
      }}
    >
      {onClose => (
        <>
          <div>
            <h2 className="text-fs20 mb-2 font-bold">스크롤 가능한 모달</h2>
            <ul className="space-y-2">
              {[...Array(50)].map((_, i) => (
                <li key={i}>리스트 항목 {i + 1}</li>
              ))}
            </ul>
          </div>
          <Button text="닫기" onClick={onClose} className="bg-pri-500 text-gray-10 mt-6 w-full" />
        </>
      )}
    </ModalExample>
  ),
}
