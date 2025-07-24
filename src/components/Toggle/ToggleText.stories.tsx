import { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import ToggleText from './ToggleText'

const meta: Meta<typeof ToggleText> = {
  title: 'Components/ToggleText',
  component: ToggleText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ToggleText는 두 가지 텍스트 중 하나를 선택해 전환할 수 있는 토글 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    leftText: { control: 'text', description: '왼쪽에 표시될 텍스트' },
    rightText: { control: 'text', description: '오른쪽에 표시될 텍스트' },
    initialSelectedText: { control: 'text', description: '초기 선택된 텍스트' },
    onToggle: { action: 'toggled', description: '선택된 텍스트가 변경될 때 호출되는 콜백' },
  },
}

export default meta
type Story = StoryObj<typeof ToggleText>

type ToggleTextWrapperProps = {
  leftText: string
  rightText: string
  initialSelectedText?: string
  onToggle?: (selectedText: string) => void
}

const ToggleTextWrapper = ({
  leftText,
  rightText,
  initialSelectedText,
  onToggle,
}: ToggleTextWrapperProps) => {
  const [selected, setSelected] = useState(initialSelectedText ?? leftText)

  const handleToggle = (text: string) => {
    setSelected(text)
    onToggle?.(text)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleText
        leftText={leftText}
        rightText={rightText}
        initialSelectedText={selected}
        onToggle={handleToggle}
      />
      <p>현재 선택된 값: {selected}</p>
    </div>
  )
}

export const Default: Story = {
  args: {
    leftText: '일반 판매',
    rightText: '입찰 판매',
    initialSelectedText: '일반 판매',
  },
  render: args => <ToggleTextWrapper {...args} />,
}
