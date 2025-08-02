import React from 'react'
import Breadcrumb from '../../../components/BreadCrumb/BreadCrumb'

const MobileWrapper = ({
  deviceType,
  breadcrumbLabel,
  children,
}: {
  deviceType: string
  breadcrumbLabel: string
  children: React.ReactNode
}) => {
  return deviceType === 'mobile' ? (
    <div className="flex min-h-[calc(100vh-90px)] flex-col">
      <Breadcrumb current={breadcrumbLabel} />
      <div className="flex flex-1 flex-col gap-4 sm:gap-5">{children}</div>
    </div>
  ) : (
    <>{children}</>
  )
}

export default MobileWrapper
