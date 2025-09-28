"use client"

import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/actions/actions'

export default function SignOutButton() {
  return (
    <Button onClick={logout}>Sign Out</Button>
  )
}
