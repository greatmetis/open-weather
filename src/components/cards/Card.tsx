import clsx from 'clsx'
import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string,
  childrenClassName?: string
}

export default function Card({children,title,childrenClassName}: Props) {

  return (
    <div className='rounded-xl bg-card bg-linear-to-br from-card to-card/60 shadow-md p-6 flex flex-col gap-4 h-full'>
      <h4 className="text-white font-semibold">{title}</h4>
      <div className={clsx(childrenClassName,'animate-[fade-in_0.6s_ease-out_forwards]') }>{children}</div>
    </div>
  )
}