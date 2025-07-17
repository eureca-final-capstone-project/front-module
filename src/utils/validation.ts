export const validateEmail = (email: string | undefined) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return '이메일을 입력해 주세요.'
  if (!emailRegex.test(email)) return '올바른 이메일 형식을 입력해 주세요.'
  return null
}
