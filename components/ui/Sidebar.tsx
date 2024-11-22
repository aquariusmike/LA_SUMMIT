'use client'
import React from 'react'
import { sidebarLinks } from '@/tsconstants'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image'


const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky lef-0 top-0 flex h-screen max-w-[200px] flex-col justify-between bg-dark-1 p-3 pt-28 text-white max-sm:hidden">
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                'bg-blue-1': isActive,
              })}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
            <p className='tex-lg font-semibold max-lg:hidden font-[inter]'>
                {link.label}
            </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar