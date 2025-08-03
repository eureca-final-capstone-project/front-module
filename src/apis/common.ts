import client from './client'

export interface KeywordRanking {
  keyword: string
  currentRank: number
  trend: 'NEW' | 'UP' | 'DOWN' | 'SAME'
  rankGap: number
}

// 검색어 순위
export const getKeywordRanking = async (): Promise<KeywordRanking[]> => {
  const res = await client.get('/common/ranking')
  return res.data.data
}

// 사용자가 입력한 검색 키워드
export const registerSearchKeyword = async (keyword: string) => {
  const res = await client.get('/common/execute', {
    params: { keyword },
  })
  return res.data
}
