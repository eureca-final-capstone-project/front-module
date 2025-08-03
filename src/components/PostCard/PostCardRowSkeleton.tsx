import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostCardRowSkeleton = () => {
  return (
    <div className="flex h-full w-full min-w-0 cursor-pointer gap-2 bg-transparent lg:gap-5">
      {/* 이미지 스켈레톤 */}
      <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-md sm:w-32 lg:w-40">
        <Skeleton height="100%" />
      </div>

      {/* 내용 스켈레톤 */}
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          {/* 데이터뱃지 + 제목 */}
          <div className="flex min-w-0 items-center gap-1">
            <Skeleton width={150} />
          </div>
          {/* 닉네임 + 시간 */}
          <div className="flex min-w-0 items-center gap-1">
            <Skeleton width={100} />
          </div>
        </div>
        {/* 판매 페이 */}
        <div className="mt-auto flex w-full flex-col gap-2">
          <div className="flex items-center justify-between font-medium">
            <Skeleton width={60} />
            <Skeleton width={80} />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton width={60} />
            <Skeleton width={80} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCardRowSkeleton
