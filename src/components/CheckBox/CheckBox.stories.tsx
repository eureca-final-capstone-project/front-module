import { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import CheckBox from './CheckBox'

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  globals: {
    backgrounds: { value: 'background' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'CheckBox 컴포넌트는 선택 여부를 표현할 때 사용하는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['default', 'check'],
    },
  },
}
export default meta

type Story = StoryObj<typeof CheckBox>

const useControlledCheck = (initialChecked: boolean) => {
  const [checked, setChecked] = useState(initialChecked)
  const toggle = () => setChecked(prev => !prev)
  return { checked, toggle }
}

export const Default: Story = {
  args: {
    type: 'default',
    checked: false,
  },
  parameters: {
    layout: 'centered',
  },
}

export const BasicCheckBoxes: Story = {
  args: {
    type: 'default',
    checked: false,
  },
  render: () => {
    const checkBox = useControlledCheck(false)
    const check = useControlledCheck(false)

    return (
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-4">
          <span>Default:</span>
          <CheckBox type="default" checked={checkBox.checked} onChange={checkBox.toggle} />
        </div>

        <div className="flex items-center gap-4">
          <span>Check:</span>
          <CheckBox type="check" checked={check.checked} onChange={check.toggle} />
        </div>
      </div>
    )
  },
}

export const WhiteCheckBoxes: Story = {
  render: () => {
    const whiteCheckBox = useControlledCheck(false)
    const whiteCheck = useControlledCheck(false)

    return (
      <div className="bg-pri-gradation flex flex-col gap-4 p-5">
        <div className="flex items-center gap-4">
          <span className="text-gray-100">WhiteCheckBox:</span>
          <CheckBox
            type="whiteCheckBox"
            checked={whiteCheckBox.checked}
            onChange={whiteCheckBox.toggle}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-100">WhiteCheck:</span>
          <CheckBox type="whiteCheck" checked={whiteCheck.checked} onChange={whiteCheck.toggle} />
        </div>
      </div>
    )
  },
}
