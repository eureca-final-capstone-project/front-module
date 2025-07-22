import z from 'zod'
import { loginSchema, signUpSchema } from '../utils/validation'

// 스키마 기반 TypeScript 타입 추론
export type LoginSchemaType = z.infer<typeof loginSchema>
export type SignUpSchemaType = z.infer<typeof signUpSchema>
