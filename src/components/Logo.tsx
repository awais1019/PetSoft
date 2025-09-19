import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo.svg'

export default function Logo() {
  return (
    <Image src={logo} alt="PetSoft Logo" />
  )
}
