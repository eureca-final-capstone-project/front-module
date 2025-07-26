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

const getPostposition = (word: string, josa1: string, josa2: string) => {
  const code = word.charCodeAt(word.length - 1)
  const hasFinalConsonant = (code - 44032) % 28 !== 0
  return `${word}${hasFinalConsonant ? josa1 : josa2}`
}

export const getRangeErrorMessage = (min: string, max: string, unitLabel: string): string => {
  const numMin = Number(min)
  const numMax = Number(max)

  if ((min !== '' && numMin < 0) || (max !== '' && numMax < 0)) {
    return '0 이상 값만 입력해주세요.'
  }

  if (min !== '' && max !== '' && numMin > numMax) {
    return `최소 ${getPostposition(unitLabel, '이', '가')} 최대 ${unitLabel}보다 높아요.`
  }

  return ''
}

export const postSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: '제목을 입력해 주세요.' })
      .max(100, { message: '제목은 100자 이내로 입력해 주세요.' }),
    content: z.string().nonempty('내용을 입력해 주세요.'),
    transactionMethod: z.union([z.literal(1), z.literal(2)]),
    price: z
      .number({ message: '가격은 숫자로 입력해 주세요.' })
      .min(1000, { message: '가격은 1000원 이상이어야 합니다.' }),
    unit: z.enum(['MB', 'GB']),
    salesDataAmount: z.number({ message: '데이터 양은 숫자로 입력해 주세요.' }),
  })
  // 데이터 최소값 검사
  .refine(
    data =>
      (data.unit === 'MB' && data.salesDataAmount >= 100) ||
      (data.unit === 'GB' && data.salesDataAmount >= 1),
    {
      path: ['salesDataAmount'],
      message: '데이터는 MB일 경우 100MB 이상, GB일 경우 1GB 이상 입력해야 합니다.',
    }
  )
  // 데이터 단위 조건 검사
  .refine(
    data =>
      (data.unit === 'MB' && data.salesDataAmount % 100 === 0) ||
      (data.unit === 'GB' && data.salesDataAmount % 1 === 0),
    {
      path: ['salesDataAmount'],
      message: 'MB는 100MB 단위, GB는 1GB 단위로만 입력할 수 있습니다.',
    }
  )
