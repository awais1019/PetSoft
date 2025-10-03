
import Logo from '@/components/logo'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bp-4 gap-y-4">
      <Logo />
      {children}
    </div>
  )
}
