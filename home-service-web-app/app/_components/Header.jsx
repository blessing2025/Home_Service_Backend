'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Header() {

    const {data}=useSession();

    useEffect(() =>{
      console.log(data); 
    },[data])

  return (
    <div className='p-2 shadow-sm flex justify-between'>
        <div className='flex items-center gap-5'>
            <Image src ='/logo.png' alt='logo' 
            width={80} height={60}/>
           {/* <div className='md:flex items-center gap-6 hidden'>
                <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Home</h2>
                <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Services</h2>
                <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>About Us</h2>
            </div>*/}
        </div>
        <div className='mt-4 flex flex-items  gap-6 items-center'>
            <Input placeholder='Search'
            className="rounded-full md:w-[350px]"/>
            <Button className =" rounded-full h-[44px]">
                <Search className='h-5 w-5'/>
            </Button>
        </div>
        <div className='flex items-center'>
            {data?.user?
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Image src={data?.user?.image}
            alt='user'
            width={40}
            height={40}
            className='rounded-full'
            />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>My Bookings</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            : 

            <Button onClick={()=>signIn('descope')}>
            Get Started
            </Button>
        } 
               
         </div>
    </div>
  )
}

export default Header