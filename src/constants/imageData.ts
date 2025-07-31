import { PostImage } from '../types/image'

export const imagePost: PostImage[] = [
  // 일반 판매 이미지
  { id: 0, type: 1, unit: '', src: '/images/posts/normal.png', alt: '일반 판매' },
  { id: 1, type: 1, unit: '', src: '/images/posts/normal2.png', alt: '일반 판매2' },

  // 입찰 판매 이미지
  { id: 2, type: 2, unit: '', src: '/images/posts/bid.png', alt: '입찰 판매' },
  { id: 3, type: 2, unit: '', src: '/images/posts/bid2.png', alt: '입찰 판매2' },

  // 공통 이미지
  { id: 4, type: 0, unit: 'MB', src: '/images/posts/mb-people.png', alt: '거래 사람 MB' },
  { id: 5, type: 0, unit: 'GB', src: '/images/posts/gb-people.png', alt: '거래 사람 GB' },
  { id: 6, type: 0, unit: 'MB', src: '/images/posts/mb-gift-box.png', alt: '선물 상자 MB' },
  { id: 7, type: 0, unit: 'GB', src: '/images/posts/gb-gift-box.png', alt: '선물 상자 GB' },
  { id: 8, type: 0, unit: 'MB', src: '/images/posts/mb.png', alt: 'MB' },
  { id: 9, type: 0, unit: 'GB', src: '/images/posts/gb.png', alt: 'GB' },
  { id: 10, type: 0, unit: 'MB', src: '/images/posts/mb2.png', alt: 'MB2' },
  { id: 11, type: 0, unit: 'GB', src: '/images/posts/gb2.png', alt: 'GB2' },
  { id: 12, type: 0, unit: '', src: '/images/posts/balloon-gift-box.png', alt: '선물 상자' },
]

export const imagePayment: Record<string, string> = {
  카드: '/images/payments/card.png',
  토스페이: '/images/payments/tosspay.png',
  페이코: '/images/payments/payco.png',
  카카오페이: '/images/payments/kakaopay.png',
  네이버페이: '/images/payments/naverpay.png',
}
