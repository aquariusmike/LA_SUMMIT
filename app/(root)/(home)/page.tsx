"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MeetingTypeList from '@/components/ui/MeetingTypeList'
import { Toaster } from '@/components/ui/toaster'

/*
async function LoginRequest() {
    const wixClient = createClient({
        modules: { members },
        auth: OAuthStrategy({
            clientId: process.env.Wix_API_ID!,
            tokens: JSON.parse(Cookies.get('session') || '{}'),
    
        })
    });
    const loginRequestData = wixClient.auth.generateOAuthData(
        "localhost:3000/callback",
        "//localhost:3000/upcoming",
    );
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
}

*/

// Add other fields based on the actual structure };

// Update the component
export default function Home() {
    // Define the state type as an array of MemberType or 
    const now = new Date()
    const time = now.toLocaleTimeString('mm',{ hour: '2-digit', minute: '2-digit'});
    
    
    const date = (new Intl.DateTimeFormat('en-Us', {
        dateStyle: 'full'
    })).format(now);
    const router = useRouter()
   
    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
            <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                <h2 className='glassmorphism max-w-[270px] rounded py-2 text-base font-normal font-[inter] pl-1'>
                    Upcoming Meeting at: 12:30 PM</h2>
            <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-extrabold lg:text-7xl '>
                     {time} </h1>
                <p className='text-lg font-medium text-sky-1 lg:text-2xl font-[opensans]'>
                    {date}
                </p>
                </div>
            </div>
            </div>
            <Toaster/>
            <MeetingTypeList />
        </section>
    );
}
