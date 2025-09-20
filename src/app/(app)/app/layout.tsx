import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background-pattern'

import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
    <BackgroundPattern />
    <div className='max-w-5xl mx-auto px- flex flex-col min-h-screen'>
    <AppHeader />
    {children}
    <AppFooter />
    </div>

    </>
  )
}
