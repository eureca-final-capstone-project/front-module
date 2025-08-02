interface LoadingSpinnerProps {
  text?: string
}

const LoadingSpinner = ({ text = '데이터를 불러오는 중...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="border-t-pri-500 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 sm:h-8 sm:w-8 sm:border-4" />
      <span className="text-gray-700">{text}</span>
    </div>
  )
}
export default LoadingSpinner
