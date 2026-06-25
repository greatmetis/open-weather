import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string,
  childrenClassName?: string
}

export default function Card({children,title,childrenClassName}: Props) {

  return (
    <div className='rounded-xl bg-card bg-linear-to-br from-card to-card/60 shadow-md p-6 flex flex-col gap-4'>
      <h4 className="text-white font-semibold">{title}</h4>
      <div className={childrenClassName}>
      {children}
      </div>
    </div>
  )
}