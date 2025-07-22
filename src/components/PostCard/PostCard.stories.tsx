import type { Meta, StoryObj } from '@storybook/react-vite'
import PostCard from './PostCard'
import type { PostCardProps } from './PostCard'
import { useState } from 'react'

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'PostCard 컴포넌트는 통신사, 판매 데이터 양, 판매글 제목, 판매자 정보 등을 포함한 카드 UI로, `col`와 `row` 타입에 따라 서로 다른 레이아웃을 제공합니다.\n\n' +
          '- `type: col`은 이미지가 상단에 위치하고 아래에 텍스트가 나열되는 세로형 `PostCard`입니다.\n' +
          '- `type: row`는 이미지가 좌측에, 텍스트 및 정보가 우측에 표시되는 가로형 `PostCard`입니다.\n\n' +
          '`favorite`, `payhistory`, `payhistorytime`, `payhistorypay` 등은 `row` 타입에서만 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['col', 'row'],
      description: '카드 레이아웃 형태',
    },
    telecomCompany: {
      control: 'select',
      options: ['LG U+', 'KT', 'SKT'],
      description: '통신사',
    },
    salesDataAmount: {
      control: 'text',
      description: '판매 데이터 양',
    },
    status: {
      control: 'radio',
      options: ['active', 'completed', 'expired'],
      description: '거래 상태',
    },
    title: {
      control: 'text',
      description: '판매 글 제목',
    },
    nickname: {
      control: 'text',
      description: '닉네임',
    },
    createdAt: {
      control: 'text',
      description: '게시 시간',
    },
    liked: {
      control: 'boolean',
      description: '관심 거래 등록 여부',
    },
    salesType: {
      control: 'radio',
      options: ['deal', 'bid'],
      description: '판매 유형 - `deal` = 일반 | `bid` = 입찰',
    },
    salesPrice: {
      control: 'number',
      description: '`deal`일 때의 거래 페이',
    },
    initialPrice: {
      control: 'number',
      description: '`bid`일 때의 최초 등록 페이',
    },
    currentHeightPrice: {
      control: 'number',
      description: '`bid`일 때의 입찰 페이',
    },
    favorite: {
      control: 'boolean',
      description: '(row 전용) 관심 거래 페이지 전용',
    },
    payhistory: {
      control: 'boolean',
      description: '(row 전용) 거래 내역 페이지 전용',
    },
    payhistorytime: {
      control: 'text',
      description: '(row 전용) 거래 일시',
    },
    payhistorypay: {
      control: 'number',
      description: '(row 전용) 거래된 페이 금액',
    },
    defaultImageNumber: {
      control: 'number',
      description: '이미지 번호 (constants/imageData.ts에서 관리됨)',
    },
  },
}

export default meta
type Story = StoryObj<PostCardProps>

export const ColType: Story = {
  render: (args: PostCardProps) => {
    const [liked, setLiked] = useState(args.liked)

    const handleToggleLike = () => {
      const newLiked = !liked
      setLiked(newLiked)

      alert(newLiked ? '관심 거래에 추가되었습니다.' : '관심 거래에서 삭제되었습니다.')
    }

    const handleClick = () => {
      alert('카드를 클릭했습니다.')
    }

    return (
      <PostCard {...args} liked={liked} onToggleLike={handleToggleLike} onClick={handleClick} />
    )
  },
  args: {
    type: 'col',
    telecomCompany: 'KT',
    defaultImageNumber: 1,
    salesDataAmount: '500',
    title: '데이터 판매합니다.',
    nickname: '몽실몽실 구름빵',
    createdAt: '2시간 전',
    liked: false,
    salesType: 'deal',
    salesPrice: 1000,
    initialPrice: 1000,
    currentHeightPrice: 2000,
    status: 'active',
  },
}

export const RowType: Story = {
  render: (args: PostCardProps) => {
    const [liked, setLiked] = useState(args.liked)

    const handleToggleLike = () => {
      const newLiked = !liked
      setLiked(newLiked)

      alert(newLiked ? '관심 거래에 추가되었습니다.' : '관심 거래에서 삭제되었습니다.')
    }

    const handleClick = () => {
      alert('카드를 클릭했습니다.')
    }

    return (
      <PostCard {...args} liked={liked} onToggleLike={handleToggleLike} onClick={handleClick} />
    )
  },
  args: {
    type: 'row',
    telecomCompany: 'KT',
    defaultImageNumber: 1,
    salesDataAmount: '500',
    title: '데이터 판매합니다.',
    nickname: '몽실몽실 구름빵',
    createdAt: '2시간 전',
    liked: false,
    salesType: 'bid',
    salesPrice: 1000,
    initialPrice: 1000,
    currentHeightPrice: 2000,
    status: 'active',
    favorite: false,
    payhistory: false,
    payhistorytime: '07월 03일 오후 04시 19분',
    payhistorypay: 2000,
  },
}
