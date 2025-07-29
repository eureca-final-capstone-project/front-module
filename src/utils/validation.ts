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

export const postTransactionSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해 주세요.' }),
  content: z.string().nonempty('내용을 입력해 주세요.'),
  salesTypeId: z.union([z.literal(1), z.literal(2)]),
  salesPrice: z.number({ message: '가격은 숫자로 입력해 주세요.' }),
  unit: z.enum(['MB', 'GB']),
  salesDataAmount: z.number({ message: '데이터 양은 숫자로 입력해 주세요.' }),
  defaultImageNumber: z.number({ message: '대표 이미지를 선택해 주세요.' }),
})

export const validateSalesDataAmount = (unit: string, amount: number, sellableDataMb: number) => {
  if (isNaN(amount)) {
    return { isValid: false, message: '가격은 숫자로 입력해 주세요.' }
  }

  const unitRules = {
    MB: {
      min: 100,
      step: 100,
      convert: (val: number) => val,
      unitLabel: 'MB',
    },
    GB: {
      min: 1,
      step: 1,
      convert: (val: number) => val * 1000,
      unitLabel: 'GB',
    },
  } as const

  const rule = unitRules[unit as keyof typeof unitRules]
  if (!rule) return { isValid: false, message: '유효하지 않은 단위입니다.' }

  const amountInMb = rule.convert(amount)

  if (amountInMb > sellableDataMb) {
    return {
      isValid: false,
      message: '판매 가능한 데이터 양 범위 내에서 입력해 주세요.',
    }
  }

  if (amount < rule.min) {
    return {
      isValid: false,
      message: `${rule.unitLabel}는 ${rule.min}${rule.unitLabel} 이상 입력해야 합니다.`,
    }
  }

  if (amount % rule.step !== 0) {
    return {
      isValid: false,
      message: `${rule.unitLabel}는 ${rule.step}${rule.unitLabel} 단위로 입력해야 합니다.`,
    }
  }

  return { isValid: true }
}

export const validateChangeDataAmount = (unit: string, amount: number, totalDataMb: number) => {
  if (isNaN(amount)) {
    return { isValid: false, message: '가격은 숫자로 입력해 주세요.' }
  }

  const unitRules = {
    MB: {
      min: 100,
      step: 100,
      convert: (val: number) => val,
      unitLabel: 'MB',
    },
    GB: {
      min: 1,
      step: 1,
      convert: (val: number) => val * 1000,
      unitLabel: 'GB',
    },
  } as const

  const rule = unitRules[unit as keyof typeof unitRules]
  if (!rule) return { isValid: false, message: '유효하지 않은 단위입니다.' }

  const amountInMb = rule.convert(amount)

  if (amountInMb > totalDataMb) {
    return {
      isValid: false,
      message: '보유 데이터 양 범위 내에서 입력해 주세요.',
    }
  }

  if (amount < rule.min) {
    return {
      isValid: false,
      message: `${rule.unitLabel}는 ${rule.min}${rule.unitLabel} 이상 입력해야 합니다.`,
    }
  }

  if (amount % rule.step !== 0) {
    return {
      isValid: false,
      message: `${rule.unitLabel}는 ${rule.step}${rule.unitLabel} 단위로 입력해야 합니다.`,
    }
  }

  return { isValid: true }
}

export const forgotPasswordSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해 주세요.'),
})

export const resetPasswordSchema = z
  .object({
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

export const refundSchema = z.object({
  refundAmount: z
    .string()
    .min(1, '환전 금액을 입력해주세요.')
    .regex(/^\d+$/, '숫자만 입력해주세요.'),
  bankId: z.coerce.number().min(1, '은행을 선택해주세요.'),
  exchangeAccount: z.string().min(1, '계좌번호를 입력해주세요.'),
})
