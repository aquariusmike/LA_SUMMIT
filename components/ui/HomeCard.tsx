import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HomeCardProps{
    className: string,
    img: string,
    title: string,
    description: string,
    handleClick: () => void;
}

const HomeCard = ({className, img, title, description, handleClick}: HomeCardProps) => {
    return (
        <div className ={cn('transition hover:bg-dark-1 hover:drop-shadow-sm hover:transition duration-100 ease-in hover:duration-200 hover:ease-out px-4 py-6 flex flex-col justify-between w-full xl:max-w-[240px]  min-h-[200px] rounded-[14px] cursor-pointer'
            , className)}
    onClick={handleClick}>

            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image
                    src={img}
                    alt={description}
                    width={24}
                    height={24}
                />

            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[18px]'>{title}</h1>
                <p className='text-[14px]'> {description} </p>
            </div>



        </div>
    )
}
    

export default HomeCard