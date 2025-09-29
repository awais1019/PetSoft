import H1 from '@/components/h1'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
  return (
    <main className='flex flex-col items-center justify-center space-y-8'>
        <H1>PetSoft access requires payment </H1>
        <Button>Buy life time access for 199$</Button>
    </main>
  )
}
