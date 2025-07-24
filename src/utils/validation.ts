import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().nonempty('비밀번호를 입력해 주세요.'),
})

export const signUpSchema = z
  .object({
    email: z.email('올바른 이메일 형식을 입력해 주세요.'),
    password: z.string().nonempty('비밀번호를 입력해 주세요.'),
    passwordConfirm: z.string(),
    carrier: z.string().nonempty('통신사를 선택해 주세요.'),
    phoneNumber: z
      .string()
      .nonempty('휴대폰 번호를 입력해 주세요.')
      .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '올바른 휴대폰 번호 형식을 입력해 주세요.'),
  })
  .refine(data => data.passwordConfirm === data.password || data.passwordConfirm === '', {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export const additionalInfoSchema = z.object({
  carrier: z.string().nonempty('통신사를 선택해 주세요.'),
  phoneNumber: z
    .string()
    .nonempty('휴대폰 번호를 입력해 주세요.')
    .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '올바른 휴대폰 번호 형식을 입력해 주세요.'),
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().nonempty('기존 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,16}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .nonempty('변경하실 닉네임을 입력해주세요.')
    .max(8, '닉네임은 최대 8자까지 가능합니다.'),
})
