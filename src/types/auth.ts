import z from 'zod'
import { loginSchema, signUpSchema } from '../utils/validation'

// 스키마 기반 TypeScript 타입 추론
export type LoginSchemaType = z.infer<typeof loginSchema>
export type SignUpSchemaType = z.infer<typeof signUpSchema>

// 회원가입 request 타입
export type SignUpRequestType = Omit<
  z.infer<typeof signUpSchema>,
  'passwordConfirm' | 'carrier'
> & {
  telecomCompanyId: number
  phoneNumber: string
  provider: string
}
