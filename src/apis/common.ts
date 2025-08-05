import client from './client'

export interface KeywordRanking {
  keyword: string
  currentRank: number
  trend: 'NEW' | 'UP' | 'DOWN' | 'SAME'
  rankGap: number
}

export interface KeywordRankingResponse {
  lastUpdatedAt: string
  top10: KeywordRanking[]
}

// 검색어 순위
export const getKeywordRanking = async (): Promise<KeywordRankingResponse> => {
  const res = await client.get('/common/ranking')
  const data = res.data.data

  return {
    top10: data.top10 || [],
    lastUpdatedAt: data.lastUpdatedAt || '',
  }
}

// 사용자가 입력한 검색 키워드
export const registerSearchKeyword = async (keyword: string) => {
  const res = await client.get('/common/execute', {
    params: { keyword },
  })
  return res.data
}
