import type { Metadata } from "next";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import { Lobster } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

export const metadata: Metadata = {
  title: "LA_Summit",
  description: "Our First Video Conferencing App made for secure learning",
  icons: {
    icon: '/icons/logo.svg'
  }
};
const inter = Inter({ subsets: ["latin"] });
const lobster = Lobster({
  subsets: ["latin"],
  weight: "400"
})
const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-h-screen">
      <ClerkProvider
      
      appearance={{
        
        layout: {
          logoImageUrl: '/icons/yoom-logo.svg'
        }
      }}
      >

      <body
        className={`${inter.className} ${lobster.className} ${opensans.className} bg-dark-2 h-screen`}>
        {children}
        <Toaster />
      </body>
      </ClerkProvider>
    </html>
  );
}
