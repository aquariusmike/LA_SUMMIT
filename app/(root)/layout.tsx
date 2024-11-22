import { ReactNode } from "react";
import { members } from "@wix/members";
import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "LA_Summit",
  description: "Our First Video Conferencing App made for secure learning",
  icons: {
    icon: '/icons/logo.svg'
  }
};
export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <main>
        <StreamVideoProvider >
        {children}
        </StreamVideoProvider>
        </main>
    
  );
}
