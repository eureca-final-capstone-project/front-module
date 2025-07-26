import z from 'zod'
import { postTransactionSchema } from '../utils/validation'

export type PostTransactionType = z.infer<typeof postTransactionSchema>

export type PostTransactionPayloadType = Omit<PostTransactionType, 'unit'>
