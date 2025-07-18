import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().nonempty('비밀번호를 입력해 주세요.'),
})

export type LoginSchemaType = z.infer<typeof loginSchema> // 스키마 기반 TypeScript 타입 추론
