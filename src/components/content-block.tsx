import { cn } from '@/lib/utils'
import React from 'react'

type ContentBlockProps = {
  children: React.ReactNode
  className?: string
}

export default function ContentBlock({children, className}: ContentBlockProps) {
  return (
    <div className={cn("rounded-md h-full w-full bg-[#F7F8FA] shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  )
}
