import { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  globals: {
    backgrounds: { value: 'background' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle 컴포넌트는 ON/OFF 상태를 전환할 수 있는 스위치 형태의 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    initialState: {
      control: 'boolean',
      description: '토글의 초기 상태',
    },
    onToggle: {
      action: 'toggled',
      description: '토글 상태 변경 시 호출되는 콜백',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    initialState: false,
  },
  render: args => {
    const ToggleWrapper = () => {
      const [isOn, setIsOn] = useState(args.initialState!)
      const handleToggle = () => setIsOn(prev => !prev)

      return <Toggle {...args} initialState={isOn} onToggle={handleToggle} />
    }
    return <ToggleWrapper />
  },
}

export const InitiallyOn: Story = {
  args: {
    initialState: true,
  },
  render: args => {
    const ToggleWrapper = () => {
      const [isOn, setIsOn] = useState(args.initialState!)
      const handleToggle = () => setIsOn(prev => !prev)

      return <Toggle {...args} initialState={isOn} onToggle={handleToggle} />
    }
    return <ToggleWrapper />
  },
}
