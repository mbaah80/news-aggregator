import React from 'react'
import { Card, Skeleton } from 'antd'

const NewsCardSkeleton: React.FC = () => {
  return (
    <Card
      className="h-full overflow-hidden rounded-xl border-0"
      bodyStyle={{ padding: '16px' }}
      cover={
        <div className="relative aspect-[16/10] bg-gray-200 animate-pulse">
          <div className="absolute bottom-4 left-4">
            <div className="h-6 w-20 bg-white/80 rounded-full" />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-10 h-10 rounded-full bg-white/80" />
            <div className="w-10 h-10 rounded-full bg-white/80" />
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton.Button
            active
            size="small"
            className="w-24 rounded-lg"
            style={{ height: '16px' }}
          />
          <div className="flex gap-4">
            <Skeleton.Button
              active
              size="small"
              className="w-20 rounded-lg"
              style={{ height: '16px' }}
            />
            <Skeleton.Button
              active
              size="small"
              className="w-20 rounded-lg"
              style={{ height: '16px' }}
            />
          </div>
        </div>

        <Skeleton
          active
          title={{ width: '90%', style: { height: '24px' } }}
          paragraph={{ rows: 2, width: ['95%', '85%'] }}
        />
      </div>
    </Card>
  )
}

export default NewsCardSkeleton 