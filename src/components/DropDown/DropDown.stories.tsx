import type { Meta, StoryObj } from '@storybook/react-vite'
import DropDown from './DropDown'
import { useState } from 'react'
import CheckBox from '../CheckBox/CheckBox'

const meta: Meta<typeof DropDown> = {
  title: 'Components/DropDown',
  component: DropDown,
  globals: {
    backgrounds: { value: 'background' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DropDown 컴포넌트는 사용자에게 옵션 목록을 제공하는 컴포넌트입니다. 기본, 통신사 선택, 필터형 등 다양한 유형(type)으로 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['default', 'provider', 'filter'],
    },
    options: {
      control: 'object',
    },
    selected: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof DropDown>

export const Default: Story = {
  args: {
    type: 'default',
    options: ['선택 1', '선택 2', '선택 3'],
    className: 'w-40',
  },
  render: args => {
    const [selected, setSelected] = useState(args.selected || 'default')

    return <DropDown {...args} selected={selected} onSelect={setSelected} />
  },
}

export const Provider: Story = {
  args: {
    type: 'provider',
    placeholder: '통신사',
    selected: '',
    className: 'w-30',
  },
  render: args => {
    const [selected, setSelected] = useState(args.selected || '')

    return <DropDown {...args} selected={selected} onSelect={setSelected} />
  },
}

export const Filter: Story = {
  args: {
    selected: '',
    className: 'w-67.75',
    paddingClassName: 'p-2',
  },
  render: args => {
    const provider = ['KT', 'LG U+', 'SKT']
    const sale = ['일반 판매', '입찰 판매']
    const [checkedList, setCheckedList] = useState<string[]>([])

    const toggleCheck = (option: string) => {
      setCheckedList(prev =>
        prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
      )
    }

    const getColorClass = (option: string) => {
      if (option === 'KT') return 'text-kt'
      if (option === 'LG U+') return 'text-lguplus'
      if (option === 'SKT') return 'text-skt'
      return 'text-gray-800'
    }

    return (
      <div className="bg-gray-10 flex flex-col gap-0.5 rounded-lg p-2">
        <DropDown {...args} onSelect={() => {}} placeholder="통신사" type="filter">
          <div className="flex flex-col gap-4">
            {provider.map(option => {
              const isChecked = checkedList.includes(option)
              return (
                <div key={option} className="flex items-center gap-2">
                  <CheckBox checked={isChecked} onChange={() => toggleCheck(option)} />
                  <span className={`text-fs16 ${getColorClass(option)}`}>{option}</span>
                </div>
              )
            })}
          </div>
        </DropDown>
        <div className="h-[0.5px] w-full bg-gray-200" />
        <DropDown {...args} onSelect={() => {}} placeholder="판매글 유형" type="filter">
          <div className="flex flex-col gap-4">
            {sale.map(option => {
              const isChecked = checkedList.includes(option)
              return (
                <div key={option} className="flex items-center gap-2">
                  <CheckBox checked={isChecked} onChange={() => toggleCheck(option)} />
                  <span className="text-gray-800">{option}</span>
                </div>
              )
            })}
          </div>
        </DropDown>
      </div>
    )
  },
}
