import { eventCouponItem } from '../apis/eventCoupon'

export const dummyCoupons: eventCouponItem[] = [
  {
    userEventCouponId: 1,
    expiresAt: '2025-08-31T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 101,
      couponNumber: 'CPN001',
      couponName: '카카오페이 할인',
      discountRate: 5,
      payType: { payTypeId: 1, name: '카카오페이' },
    },
  },
  {
    userEventCouponId: 2,
    expiresAt: '2025-09-15T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 102,
      couponNumber: 'CPN002',
      couponName: '토스페이 캐시백',
      discountRate: 3,
      payType: { payTypeId: 2, name: '토스페이' },
    },
  },
  {
    userEventCouponId: 3,
    expiresAt: '2025-10-01T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 103,
      couponNumber: 'CPN003',
      couponName: '네이버페이 적립',
      discountRate: 7,
      payType: { payTypeId: 3, name: '네이버페이' },
    },
  },
]
