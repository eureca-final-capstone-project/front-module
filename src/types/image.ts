export interface PostImage {
  id: number
  type: 0 | 1 | 2 // 0은 공통
  unit: '' | 'MB' | 'GB' // 빈 값은 공통
  src: string
  alt: string
}
