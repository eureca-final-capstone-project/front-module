import PostCard from '../../../components/PostCard/PostCard'
import type { PostCardProps } from '../../../components/PostCard/PostCard'
import PostCardColSkeleton from '../../../components/PostCard/PostCardColSkeleton'
import PostCardRowSkeleton from '../../../components/PostCard/PostCardRowSkeleton'
import { useDeviceType } from '../../../hooks/useDeviceType'

interface PostCardGridProps {
  posts: PostCardProps[]
  isLoading: boolean
}

const PostCardGrid = ({ posts, isLoading }: PostCardGridProps) => {
  const deviceType = useDeviceType()

  if (isLoading) {
    const skeletonCount = 12
    return (
      <div
        className={`min-w-0 ${
          deviceType === 'mobile'
            ? 'bg-gray-10 grid min-w-0 grid-cols-1 gap-4 p-4'
            : deviceType === 'tablet'
              ? 'grid grid-cols-1 gap-x-6 gap-y-15.5 pb-10 md:grid-cols-2'
              : 'grid grid-cols-3 gap-x-6 gap-y-15.5 pb-10 xl:grid-cols-4'
        }`}
      >
        {Array.from({ length: skeletonCount }).map((_, idx) =>
          deviceType === 'mobile' ? (
            <div
              key={idx}
              className={`pb-4 ${idx !== skeletonCount - 1 ? 'border-b-[0.5px] border-gray-200' : ''}`}
            >
              <PostCardRowSkeleton />
            </div>
          ) : (
            <PostCardColSkeleton key={idx} />
          )
        )}
      </div>
    )
  }

  return (
    <div
      className={`min-w-0 ${
        deviceType === 'mobile'
          ? 'bg-gray-10 grid min-w-0 grid-cols-1 gap-4 p-4'
          : deviceType === 'tablet'
            ? 'grid grid-cols-1 gap-x-6 gap-y-15.5 pb-10 md:grid-cols-2'
            : 'grid grid-cols-3 gap-x-6 gap-y-15.5 pb-10 xl:grid-cols-4'
      }`}
    >
      {posts.map((post, idx) =>
        deviceType === 'mobile' ? (
          <div
            key={post.transactionFeedId}
            className={`pb-4 ${idx !== posts.length - 1 ? 'border-b-[0.5px] border-gray-200' : ''}`}
          >
            <PostCard {...post} type="row" />
          </div>
        ) : (
          <PostCard key={post.transactionFeedId} {...post} type="col" />
        )
      )}
    </div>
  )
}

export default PostCardGrid
