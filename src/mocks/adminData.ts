export const userHistoryData = Array.from({ length: 150 }, (_, index) => ({
  userId: index + 1,
  email: `user${index + 1}@datch.com`,
  nickname: `닉네임${index + 1}`,
  telecomCompany: ['SKT', 'KT', 'LGU+'][index % 3],
  phoneNumber: `010-${String(1000 + index).padStart(4, '0')}-${String(5678 + index).padStart(4, '0')}`,
  createdAt: `2025-07-${String(1 + (index % 28)).padStart(2, '0')}T10:00:00`,
  reportCount: index % 3,
  status: ['활성', '비활성', '검수대기'][index % 3],
  isBlocked: index % 2 === 0 ? false : true,
}))

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
