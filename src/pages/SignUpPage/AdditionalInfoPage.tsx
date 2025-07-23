import AddtionalInfoForm from './components/AddtionalInfoForm'

const AdditionalInfoPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <div className="gap flex flex-col gap-2">
        <h1 className="text-gray-10 sm:text-pri-900 text-fs24 text-center font-semibold">
          회원가입
        </h1>
        <span className="text-gray-10 sm:text-pri-900 text-fs14 text-center">
          추가 정보를 입력하시고 회원가입을 진행해주세요!
        </span>
      </div>

      <div className="space-y-4 sm:space-y-7">
        <AddtionalInfoForm />
      </div>
    </main>
  )
}

export default AdditionalInfoPage
