'use client'

import Link from "next/link"
import Logo from "./Logo"
import { BellIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/lib/api"
import profileImg  from '../../assets/profileImg.png'

function Header() {

  const { data:user } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
  });
    
  return (
    <div className="w-full flex px-10 py-5 justify-between">

      <Logo/>

      <div className="flex gap-5 items-center">
          <Link href='/notifications'>
            <BellIcon/>
          </Link>

          <Link href='/profile'>
            <Image src={user?.profilePic || profileImg } alt="User Avatar" rel="noreferrer" 
              className="w-[30px] h-[30px] rounded-full object-cover"/>
          </Link>

          <button>
            <LogOutIcon/>
          </button>
      </div>

    </div>
  )
}

export default Header
