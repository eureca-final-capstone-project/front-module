import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostCardColSkeleton = () => {
  return (
    <div className="flex w-full cursor-pointer flex-col gap-6">
      {/* 이미지 스켈레톤 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Skeleton height="100%" />
      </div>

      <div className="space-y-2">
        {/* 판매 데이터 + 제목 스켈레톤 */}
        <div className="flex items-center gap-1">
          <Skeleton width={150} />
        </div>

        {/* 닉네임 + 시간 스켈레톤 */}
        <div className="flex items-center gap-1">
          <Skeleton width={100} />
        </div>

        {/* 판매 페이 스켈레톤 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
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

export default PostCardColSkeleton
