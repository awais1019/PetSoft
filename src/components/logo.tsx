import Image from 'next/image'
import React from 'react'

import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="PetSoft Logo" width={40} height={40} className='w-[40px] h-[40px]' />
    </Link>
  )
}
