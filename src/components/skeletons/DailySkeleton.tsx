import React from 'react'
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function DailySkeleton({}: Props) {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
    {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="w-10 h-6" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
        </div>
      ))}
    </Card>
  )
}