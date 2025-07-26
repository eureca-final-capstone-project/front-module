import z from 'zod'
import { postSchema } from '../utils/validation'

export type PostFormType = z.infer<typeof postSchema>
