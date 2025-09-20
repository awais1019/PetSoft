import React from 'react'

export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className='text-2xl font-medium leading-8'>{children}</h1>
  )
}
