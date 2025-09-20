import React from 'react'

export default function AppFooter() {
  return (
    <footer className='border-t border-black/10 py-3  mt-auto'>
        <small className='opacity-50'>© {new Date().getFullYear()} PetSoft. All rights reserved.</small>
    </footer>
  )
}
