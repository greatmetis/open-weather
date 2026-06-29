import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function CurrentSkeleton({}: Props) {
  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-4">
      <Skeleton className="w-50 h-11"/>
      <Skeleton className="w-30 h-4"/>
      <Skeleton className="size-14 rounded-full"/>
      <Skeleton className="w-50 h-8"/>
      <div className="flex flex-col">
        <p className="text-center">Local Time:</p>
        <Skeleton className="w-30 h-10"/>
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <p>Feels like</p>
          <Skeleton className="w-30 h-6"/>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p>Humidity</p>
          <Skeleton className="w-30 h-6"/>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p>Wind</p>
          <Skeleton className="w-30 h-6"/>
        </div>
      </div>
    </Card>
  )
}