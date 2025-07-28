import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { useUserStore } from '../../store/userStore'
import { formatDataSize } from '../../utils/format'
import { getUserDataStatus } from '../../apis/userInfo'
import DataInput from './components/DataInput'
import FloatActionButton from '../../components/FloatActionButton'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import { useDeviceType } from '../../hooks/useDeviceType'
import ChangeDataModal from './components/ChangeDataModal'
import { putEnableSaleData } from '../../apis/userInfo'
import { useToast } from '../../hooks/useToast'
import { useNavigate } from 'react-router-dom'

const ChangeDataPage = () => {
  const setData = useUserStore(state => state.setData)
  const deviceType = useDeviceType()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      unit: 'MB',
      changeDataAmount: '',
    },
  })

  const {
    watch,
    formState: { errors },
  } = methods

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userDataStatus'],
    queryFn: getUserDataStatus,
  })

  const mutation = useMutation({
    mutationFn: putEnableSaleData,
    onSuccess: () => {
      showToast?.({ type: 'success', msg: '데이터 전환이 완료되었습니다.' })
      setIsModalOpen(false)
      navigate('/mypage/data-charge')
    },
    onError: error => {
      showToast?.({
        type: 'error',
        msg: error.message || '데이터 전환에 실패했습니다.',
      })
    },
  })

  const unit = watch('unit')
  const rawChangeAmount = watch('changeDataAmount')
  const changeDataAmount = Number(rawChangeAmount) || 0

  const changeAmountInMb = unit === 'GB' ? changeDataAmount * 1000 : changeDataAmount

  const totalDataMb = data?.totalDataMb ?? 0
  const sellableDataMb = data?.sellableDataMb ?? 0

  const afterTotal = totalDataMb - changeAmountInMb
  const afterSellable = sellableDataMb + changeAmountInMb

  const isValid = rawChangeAmount !== '' && !errors.changeDataAmount

  useEffect(() => {
    if (
      data?.totalDataMb !== undefined &&
      data?.sellableDataMb !== undefined &&
      data?.buyerDataMb !== undefined
    ) {
      setData({
        totalDataMb: data.totalDataMb,
        sellableDataMb: data.sellableDataMb,
        buyerDataMb: data.buyerDataMb,
      })
    }
  }, [data, setData])

  if (isLoading) {
    return <div className="text-fs14 text-gray-400">데이터 정보를 불러오는 중...</div>
  }

  if (isError || !data) {
    return <div className="text-fs14 text-error">데이터 정보를 불러올 수 없습니다.</div>
  }

  return (
    <FormProvider {...methods}>
      <div className="flex h-full flex-col px-0 pb-20 sm:h-[calc(100vh-126px)] sm:justify-between sm:pb-0">
        {deviceType === 'mobile' ? <Breadcrumb current="데이터 전환" /> : ''}

        <div className="flex h-full flex-col gap-4 px-4 sm:px-0">
          <Card type="label" labelTitle="현재 데이터 정보" withMotion motionCustom={0}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>보유 데이터</div>
                <div>{formatDataSize(data.totalDataMb)}</div>
              </div>
              <div className="flex justify-between">
                <div>판매 가능 데이터</div>
                <div>{formatDataSize(data.sellableDataMb)}</div>
              </div>
            </div>
          </Card>

          <Card type="label" labelTitle="데이터 전환" withMotion motionCustom={1}>
            <DataInput />
          </Card>
          <Card
            type="warning"
            iconTitle="데이터 전환 시, 보유 데이터로 재전환이 불가합니다"
            iconDescription="신중하게 결정해주세요!"
            withMotion
            motionCustom={2}
          />
        </div>
        <FloatActionButton
          show={isValid}
          text="전환하기"
          onClick={() => setIsModalOpen(true)}
          disabled={!isValid}
          className={!isValid ? 'button-disabled' : 'button-active'}
        />
      </div>
      <ChangeDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickLeft={() => setIsModalOpen(false)}
        onClickRight={() => {
          mutation.mutate(changeAmountInMb)
        }}
        afterTotalDataMb={afterTotal}
        afterSellableDataMb={afterSellable}
      />
    </FormProvider>
  )
}

export default ChangeDataPage
