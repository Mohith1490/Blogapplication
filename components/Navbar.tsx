import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth } from '@/auth'
import SignInAction, { SignOutAction } from './SignInAction'
import '../app/global.css'

const Navbar = async () => {
  const sessions = await auth()
  return (
    <header className='px-5 py-3 shadow-sm bg-white font-work-sans' >
      <nav  className='w-full h-5 border-red-500 flex justify-between items-center' >
        <Link href="/" className='flex items-center' >
          <Image src="/astro.png" alt="logo" width={30} height={30} />
          <span>Mohith singh</span>
        </Link>
        <div className='flex items-center gap-5' >
          {
            sessions && sessions?.user ? (
             <SignOutAction sessions={sessions} />
            ) : (
              <SignInAction/>
            )
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar