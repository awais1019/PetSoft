import { cn } from '@/lib/utils'
import React from 'react'

type H1Props = {
  children: React.ReactNode
  className?: string
}


export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("text-2xl font-medium leading-8", className)}>
      {children}
    </h1>
  )
}
