import React from 'react'

export default function ContentBlock({children}: {children: React.ReactNode}) {
  return (
    <div className='rounded-md h-full w-full bg-[#F7F8FA] shadow-sm overflow-hidden'>
      {children}
    </div>
  )
}
