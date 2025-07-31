import { PostImage } from '../types/image'

export const imagePost: PostImage[] = [
  // 일반 판매 이미지
  { id: 0, option: 1, src: '/images/posts/normal.png', alt: '일반 판매' },
  { id: 1, option: 1, src: '/images/posts/normal2.png', alt: '일반 판매2' },

  // 입찰 판매 이미지
  { id: 2, option: 2, src: '/images/posts/bid.png', alt: '입찰 판매' },
  { id: 3, option: 2, src: '/images/posts/bid2.png', alt: '입찰 판매2' },

  // 공통 이미지
  { id: 4, option: 0, src: '/images/posts/mb-people.png', alt: '거래 사람 MB' },
  { id: 5, option: 0, src: '/images/posts/gb-people.png', alt: '거래 사람 GB' },
  { id: 6, option: 0, src: '/images/posts/mb-gift-box.png', alt: '선물 상자 MB' },
  { id: 7, option: 0, src: '/images/posts/gb-gift-box.png', alt: '선물 상자 GB' },
  { id: 8, option: 0, src: '/images/posts/mb.png', alt: 'MB' },
  { id: 9, option: 0, src: '/images/posts/gb.png', alt: 'MB2' },
  { id: 10, option: 0, src: '/images/posts/mb2.png', alt: 'GB' },
  { id: 11, option: 0, src: '/images/posts/gb2.png', alt: 'GB2' },
  { id: 12, option: 0, src: '/images/posts/balloon-gift-box.png', alt: '선물 상자' },
]

export const imagePayment: Record<string, string> = {
  카드: '/images/payments/card.png',
  토스페이: '/images/payments/tosspay.png',
  페이코: '/images/payments/payco.png',
  카카오페이: '/images/payments/kakaopay.png',
  네이버페이: '/images/payments/naverpay.png',
}
