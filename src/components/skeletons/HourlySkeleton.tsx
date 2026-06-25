import React from 'react'
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function HourlySkeleton({}: Props) {
  return (
    <Card title="Hourly Forecast (24 Hours)" childrenClassName="flex gap-3 overflow-x-scroll">
        {Array.from({length:12},(_,i)=>(
          <div key={i} className="flex flex-col items-center gap-4 p-2">
            <Skeleton className="w-10 h-4"/>
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="w12" />
          </div>
        ))}
    </Card>
  )
}