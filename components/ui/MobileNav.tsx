"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/tsconstants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px] h-[34px] text-white'>

            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt='LA Summit Mobile nav'
                        width={34}
                        height={34}
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-dark-1 text-white'>
                <SheetTitle>
                            <VisuallyHidden>Navigation Menu</VisuallyHidden>
                        </SheetTitle>
                        <SheetDescription>
                        <VisuallyHidden>Navigation Menu Resources</VisuallyHidden>
                        </SheetDescription>

                    <Link href="./" className='flex items-center gap-1'>
                        <Image
                            src="/icons/logo.svg"
                            alt="LA Summit Logo"
                            width={32}
                            height={32}
                            className="max-sm:size-10 font-[inter]"
                        />
                        <p className="text-[16px] font-extrabold font-[lobster] text-white max-sm:size-15">LA Summit</p>
                    </Link>

                    <div className='flex g-[calc(100vh- 72px)] flex-col justify-between overflow-y-auto'>

                    </div>
                    <SheetClose asChild >
                        <section className='flex w-full flex-col gap-3 pt-16 text-white'>

                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.route || pathname.startsWith(link.route);

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
                                        <p className='tex-lg font-semibold text-[14px]  min-sm:hidden font-[inter]'>
                                            {link.label}
                                        </p>
                                    </Link>
                                )
                            })}

                        </section>
                    </SheetClose>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav