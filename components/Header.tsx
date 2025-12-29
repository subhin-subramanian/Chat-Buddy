'use client'

import Link from "next/link"
import Logo from "./Logo"
import { useQuery} from "@tanstack/react-query"
import { getMe } from "@/lib/api"
import profileImg  from '../assets/profileImg.png'
import useLogout from "@/hooks/useLogout"
import { BellIcon, LogOutIcon, CircleUserRound, HomeIcon, 
         Menu, MessagesSquare, Power, Users, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

function Header() {
  
  const [navOpen, setNavOpen] = useState <boolean> (false);
  const currentPath = usePathname();
  const { mutate:logOutMutation, isPending} = useLogout();

  const { data:user} = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const handleLogout = ()=>{
     logOutMutation();
  }

  return (
    <>
    <div className="fixed top-0 left-0 h-16 z-50 w-full flex p-5 sm:px-10 justify-between bg-base-300">

      <Logo/>

      <div className="flex gap-5 items-center">
          <Link href='/notifications'>
            <BellIcon/>
          </Link>

          <Link href='/profile'>
            <img src={user?.profilePic?.trim() || profileImg.src} 
                 alt="Avatar"
                 className="w-[30px] h-[30px] rounded-full object-cover"
                 onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== profileImg.src){
                    img.src = profileImg.src;
                  }
                 }}/>
          </Link>

          <button className="cursor-pointer hidden sm:flex">
            {isPending ?
              <div className="h-8 w-8 rounded-full border border-blue-300 border-t-blue-600 animate-spin"></div> :
            <LogOutIcon onClick={handleLogout}/>}
          </button>

          {/* Mobile Button for SideBar in smaller screens*/}
          <button className="md:hidden p-1 outline-2 rounded-lg" onClick={()=>setNavOpen(prev => !prev)}>
             {navOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>

      </div>

    </div>

    {/* Sidebar for smaller screens */}
    {navOpen && (
     <div className="md:hidden relative mx-5 flex flex-col bg-base-200 border border-gray-500 rounded-xl ">

        <Link href='/' onClick={() => setNavOpen(false)} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "bg-gray-700" : ""}`}>
          <HomeIcon className="size-5 text-base-content opacity-70"/>
          <span>Home</span>
        </Link>

        <Link href='/frnd-rqsts' onClick={() => setNavOpen(false)} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/frnd-rqsts' ? "bg-gray-700" : ""}`}>
          <Users className="size-5 text-base-content opacity-70"/>
          <span>Friend Requests</span>
        </Link>

        <Link href='/notifications' onClick={() => setNavOpen(false)} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "bg-gray-700" : ""}`}>
          <BellIcon className="size-5 text-base-content opacity-70"/>
          <span>Notifications</span>
        </Link>

        <Link href={`/chat`} onClick={() => setNavOpen(false)} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/chat' ? "bg-gray-700" : ""}`}>
          <MessagesSquare className="size-5 text-base-content opacity-70"/>
          <span>Chat</span>
        </Link>

        <Link href='/profile' onClick={() => setNavOpen(false)} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/profile' ? "bg-gray-700" : ""}`}>
          <CircleUserRound className="size-5 text-base-content opacity-70"/>
          <span>Profile</span>
        </Link>

        <button onClick={handleLogout} className="btn btn-ghost justify-start w-full gap-3 px-3 normal-case">
          <Power className="size-5 text-base-content opacity-70"/>Logout
        </button>

    </div>)}
    </>
  )
}

export default Header
