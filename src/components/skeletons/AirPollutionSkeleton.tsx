import React from 'react'
import { Skeleton } from '../ui/skeleton'
import Card from '../cards/Card'

type Props = {}

export default function AirPollutionSkeleton({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="min-w-xs w-full h-8"/>
      <Skeleton className="w-full h-9"/>
      <Skeleton className="w-full h-8"/>
          <Skeleton />
          {Array.from({length:6},(_,i)=>{
            return(
            <Card key={i}
            childrenClassName="flex flex-col !gap-2"
            >
              <div className="flex justify-between">
                <Skeleton className="font-bold capitalize w-11 h-6"></Skeleton>
                <Skeleton className="font-semibold w-20 h-6"></Skeleton>
              </div>
              <Skeleton className="font-semibold w-full h-1.5"></Skeleton>
              <div className="flex justify-between">
                <Skeleton className="font-bold capitalize w-11 h-6"></Skeleton>
                <Skeleton className="font-semibold w-20 h-6"></Skeleton>
              </div>
              <div className="flex justify-between">
                {Array.from({length:5},(_,i)=>{
                return(
                  <Skeleton className="w-8 h-6"/>
                )
                })}
              </div>
            </Card>
            )
          })
          }
        </div>  
  )
}