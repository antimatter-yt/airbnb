"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Logo = () => {
    const router = useRouter()
  return (
    <div onClick={()=>router.push('/')}>
        <Image
        alt='logo'
        className='hidden md:block cursor-pointer'
        height="50"
        width="50"
        src="/images/logo.png"
        />
    </div>
  )
}
