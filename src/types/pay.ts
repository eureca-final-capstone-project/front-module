import z from 'zod'
import { refundSchema } from '../utils/validation'

export type RefundSchemaType = z.infer<typeof refundSchema>
