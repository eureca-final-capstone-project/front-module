import client from './client'

export interface QuizData {
  quizId: number
  quizTitle: string
  quizDescription: string
  quizAnswer: string
  quizHint: string
}

interface QuizSuccessData {
  userId: number
  quizId: number
  reward: number
}

interface QuizFailData {
  statusCode: number
  statusCodeName: string
  detailMessage: string
}

interface QuizStatusResponse {
  statusCode: number
  message: string
  data: QuizSuccessData | QuizFailData
}

export const getQuizData = async (): Promise<QuizData> => {
  const res = await client.get('/event/quizzes')
  return res.data.data
}

export const postQuizStatus = async (quizId: number): Promise<QuizSuccessData> => {
  const res = await client.post<QuizStatusResponse>('/event/modify-quiz-status', { quizId })

  const { statusCode, data } = res.data

  if (statusCode !== 200) {
    const failData = data as QuizFailData
    throw new Error(failData.detailMessage || '퀴즈 참여에 실패했습니다.')
  }

  return data as QuizSuccessData
}
