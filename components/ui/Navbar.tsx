import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-[100vw] bg-dark-1 px-5 py-5 lg:px-10'>
        <Link href="/" className='flex items-center gap-1'>
        <Image 
        src ="/icons/logo.svg"
        alt ="LA Summit Logo"
        width = {60}
        height = {60}
        className=" font-[inter]"
        />
        <p className="text-[25px] font-extrabold font-[lobster] text-white max-sm:hidden">LA Summit</p>
        </Link>
        <div className="flex-between gap-5">
        
            <SignedIn>
              <UserButton />
            </SignedIn>
            
            <MobileNav 
            
            />

        </div>
    </nav>
)
}

export default Navbar