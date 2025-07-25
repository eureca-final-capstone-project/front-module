export const userHistoryData = [
  {
    userId: '1',
    email: 'abc@datch.com',
    nickname: '몽실몽실구름빵',
    telecomCompany: 'SKT',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-07-01T10:00:00',
    reportCount: 2,
    status: '활성',
    isBlocked: false,
  },
  {
    userId: '2',
    email: 'def@datch.com',
    nickname: '빛나는별',
    telecomCompany: 'KT',
    phoneNumber: '010-2345-6789',
    createdAt: '2025-07-01T10:00:00',
    reportCount: 0,
    status: '비활성',
    isBlocked: true,
  },
]

export const userReportData = [
  {
    reportId: 1,
    reportType: '욕설 및 비속어 포함',
    content: '채팅에서 심한 욕설 사용',
    createdAt: '2025-07-01T10:00:00',
    status: 'AI승인',
  },
  {
    reportId: 2,
    reportType: '욕설 및 비속어 포함',
    content: '같은 내용의 광고 메시지 반복 전송',
    createdAt: '2025-07-05T14:30:00',
    status: '관리자승인',
  },
  {
    reportId: 3,
    reportType: '허위 정보',
    content: '거짓 정보로 사용자 혼란 유발',
    createdAt: '2025-07-10T09:15:00',
    status: '검수대기',
  },
]
