import { Skeleton } from '@mui/material'

export function PostCardSkeleton() {
  return (
    <div className="w-[360px] rounded-2xl bg-white shadow-md overflow-hidden mb-7">
      <div className="relative h-[200px] w-full">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
        />
        <div className="absolute top-3 left-3">
          <Skeleton
            variant="rounded"
            width={90}
            height={28}
          />
        </div>
      </div>
      <div className="p-4">
        <Skeleton variant="text" height={32} width="60%" />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="90%" />

        <div className="flex items-center justify-between mt-4">
          <Skeleton variant="text" width={100} height={28} />

          <div className="flex gap-2">
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="circular" width={36} height={36} />
          </div>
        </div>
      </div>
    </div>
  )
}
