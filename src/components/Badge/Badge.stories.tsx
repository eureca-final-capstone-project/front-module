import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge 컴포넌트는 상태, 분류, 라벨 등 정보를 시각적으로 표현할 때 사용하는 컴포넌트입니다.',
      },
    },
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
    background: {
      control: 'select',
      options: ['gray50', 'gray200'],
      if: { arg: 'variant', eq: 'secondary' },
      description: 'variant가 secondary일 때만 선택 가능합니다.',
    },
    status: {
      control: 'select',
      options: ['success', 'error'],
      if: { arg: 'variant', eq: 'outline' },
      description: 'variant가 outline일 때만 선택 가능합니다.',
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
      <Badge size="small" className="bg-lguplus" label="LG U+" />
      <Badge size="small" className="bg-skt" label="SKT" />
      <Badge size="small" className="bg-kt" label="KT" />
    </div>
  ),
}

export const ListBadges: Story = {
  name: '페이 / 신고 내역 관련 뱃지',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge label="거래" className="bg-pri-400" />
        <Badge label="충전/환전" className="bg-pri-300" />
      </div>
      <div className="flex gap-2">
        <Badge label="처리 대기" className="bg-pri-300" />
        <Badge label="처리 완료" className="bg-success" />
      </div>
    </div>
  ),
}

export const AdminBadges: Story = {
  name: '관리자 관련 뱃지',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge label="활성" />
        <Badge variant="secondary" background="gray50" label="비활성" />
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary" background="gray200" label="검수대기" />
        <Badge variant="outline" status="success" label="AI승인" />
        <Badge variant="outline" status="error" label="AI거절" />
        <Badge label="관리자승인" className="bg-success" />
        <Badge label="관리자거절" className="bg-error" />
      </div>
      <div className="flex gap-2">
        <Badge label="제재 완료" />
        <Badge variant="secondary" background="gray200" label="제재 대기 중" />
      </div>
    </div>
  ),
}
