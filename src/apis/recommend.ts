import client from './client'
import { ServerPostCard } from '../utils/postCardParse'

interface RecommendedResponse {
  statusCode: number
  message: string
  data: ServerPostCard[]
}

export const getRecommendedPosts = async (): Promise<ServerPostCard[]> => {
  const res = await client.get<RecommendedResponse>('/recommend')
  return res.data.data
}
