import z from 'zod'
import {
  additionalInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  nicknameSchema,
  passwordChangeSchema,
  resetPasswordSchema,
  signUpSchema,
} from '../utils/validation'

// 스키마 기반 TypeScript 타입 추론
export type LoginSchemaType = z.infer<typeof loginSchema>
export type SignUpSchemaType = z.infer<typeof signUpSchema>
export type AdditionalInfoSchemaTye = z.infer<typeof additionalInfoSchema>
export type PasswordChangeSchemaType = z.infer<typeof passwordChangeSchema>
export type NicknameSchemaType = z.infer<typeof nicknameSchema>
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>
export type PasswordResetSchemaType = z.infer<typeof resetPasswordSchema>

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

// 비밀번호 재설정 request 타입
export type PasswordRestRequestType = Omit<PasswordResetSchemaType, 'confirmPassword'> & {
  token: string
}
