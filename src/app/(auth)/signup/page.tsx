import AuthForm from '@/components/auth-form'
import H1 from '@/components/h1'
import Link from 'next/link'

import React from 'react'

export default function SignupPage() {
  return (
    <main>
         <H1 className="text-center mb-2">Sign Up</H1>
         <AuthForm />
         <p className="mt-4 text-center text-sm text-zinc-500">
           {`Already have an account? `}
           <Link href="/login">Log In</Link>
         </p>
       </main>
  )
}
