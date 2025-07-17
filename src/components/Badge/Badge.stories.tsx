import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    color: {
      control: 'select',
      options: ['gray50', 'gray200', 'success', 'error'],
      description: '색상은 variant가 secondary 또는 outline일 때만 적용됩니다.',
      if: { arg: 'variant', neq: 'default' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    label: 'label',
  },
}

export const ProviderBadges: Story = {
  name: '통신사 관련 뱃지',
  render: () => (
    <div className="flex gap-2">
      <Badge size="small" className="bg-lguplus" label="LG U+"></Badge>
      <Badge size="small" className="bg-skt" label="SKT"></Badge>
      <Badge size="small" className="bg-kt" label="KT"></Badge>
    </div>
  ),
}

export const AdminBadges: Story = {
  name: '관리자 관련 뱃지',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Badge label="활성"></Badge>
        <Badge variant="secondary" color="gray50" label="비활성"></Badge>
      </div>
      <div className="flex flex-row gap-2">
        <Badge variant="secondary" label="검수대기"></Badge>
        <Badge variant="outline" color="success" label="AI승인"></Badge>
        <Badge variant="outline" color="error" label="AI거절"></Badge>
        <Badge variant="secondary" color="success" label="관리자승인"></Badge>
        <Badge variant="secondary" color="error" label="관리자거절"></Badge>
      </div>
      <div className="flex flex-row gap-2">
        <Badge label="제재 완료"></Badge>
        <Badge variant="secondary" color="gray200" label="제재 대기 중"></Badge>
      </div>
    </div>
  ),
}
