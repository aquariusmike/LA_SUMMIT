'use client'
import React from 'react'
import { ReactNode } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative flex flex-row'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
            </div>
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:sm:px-14">
                <div className='w-full'>
                    {children}

                </div>
            </section>
        </main>
    )
}

export default HomeLayout