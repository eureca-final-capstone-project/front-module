import z from 'zod'
import {
  additionalInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  nicknameSchema,
  passwordChangeSchema,
  signUpSchema,
} from '../utils/validation'

// 스키마 기반 TypeScript 타입 추론
export type LoginSchemaType = z.infer<typeof loginSchema>
export type SignUpSchemaType = z.infer<typeof signUpSchema>
export type AdditionalInfoSchemaTye = z.infer<typeof additionalInfoSchema>
export type PasswordChangeSchemaType = z.infer<typeof passwordChangeSchema>
export type NicknameSchemaType = z.infer<typeof nicknameSchema>
export type ForgetPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

// 회원가입 request 타입
export type SignUpRequestType = Omit<
  z.infer<typeof signUpSchema>,
  'passwordConfirm' | 'carrier'
> & {
  telecomCompanyId: number
  phoneNumber: string
  provider: string
}

// 추가 정보 입력 request 타입
export type AdditionalInfoRequestType = {
  telecomCompanyId: number
  phoneNumber: string
}
