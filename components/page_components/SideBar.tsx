"use client"

import useLogout from "@/hooks/useLogout";
import { BellIcon, CircleUserRound, HomeIcon, Menu, MessagesSquare, Power, Users, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";

function SideBar() {

  const currentPath = usePathname();
  const [navOpen, setNavOpen] = useState <boolean> (false);
  const { mutate:logOutMutation, isPending } = useLogout();

  const handleLogout = () => {
    logOutMutation();
  }

  return (
    <div className="">

    {/* Sidebar for larger screens */}
    <aside className="hidden md:flex flex-col min-w-64 w-64 bg-base-200 border-r border-base-300 h-screen sticky top-0">

      <nav className="flex-1 p-4 space-y-1">

        <Link href='/' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "bg-gray-700" : ""}`}>
          <HomeIcon className="size-5 text-base-content opacity-70"/>
          <span>Home</span>
        </Link>

        <Link href='/frnd-rqsts' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/frnd-rqsts' ? "bg-gray-700" : ""}`}>
          <Users className="size-5 text-base-content opacity-70"/>
          <span>Friend Requests</span>
        </Link>

        <Link href='/notifications' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "bg-gray-700" : ""}`}>
          <BellIcon className="size-5 text-base-content opacity-70"/>
          <span>Notifications</span>
        </Link>

        <Link href='/chat' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/chat' ? "bg-gray-700" : ""}`}>
          <MessagesSquare className="size-5 text-base-content opacity-70"/>
          <span>Chat</span>
        </Link>

        <Link href='/profile' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/profile' ? "bg-gray-700" : ""}`}>
          <CircleUserRound className="size-5 text-base-content opacity-70"/>
          <span>Profile</span>
        </Link>

        <button className="btn btn-ghost justify-start w-full gap-3 px-3 normal-case"
                onClick={handleLogout}>
          <Power className="size-5 text-base-content opacity-70"/>{ isPending ? "Loggingout..." : "Logout"}
        </button>
        
      </nav>

    </aside>

    {/* Mobile Button */}
    <button className="md:hidden absolute top-6 right-2 p-1 outline-2 rounded-lg" onClick={()=>setNavOpen(!navOpen)}>
      {navOpen ? <X size={18}/> : <Menu size={18}/>}
    </button>

    {/* Sidebar for smaller screens */}
    {navOpen && 
     <aside className="md:hidden w-full flex flex-col bg-base-200 border border-gray-500 rounded-xl ">

      <nav className="flex-1 p-4 space-y-1">

        <Link href='/' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "bg-gray-700" : ""}`}>
          <HomeIcon className="size-5 text-base-content opacity-70"/>
          <span>Home</span>
        </Link>

        <Link href='/frnd-rqsts' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/frnd-rqsts' ? "bg-gray-700" : ""}`}>
          <Users className="size-5 text-base-content opacity-70"/>
          <span>Friend Requests</span>
        </Link>

        <Link href='/notifications' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "bg-gray-700" : ""}`}>
          <BellIcon className="size-5 text-base-content opacity-70"/>
          <span>Notifications</span>
        </Link>

        <Link href='/chat' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/chat' ? "bg-gray-700" : ""}`}>
          <MessagesSquare className="size-5 text-base-content opacity-70"/>
          <span>Chat</span>
        </Link>

        <Link href='/profile' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/profile' ? "bg-gray-700" : ""}`}>
          <CircleUserRound className="size-5 text-base-content opacity-70"/>
          <span>Profile</span>
        </Link>

        <button className="btn btn-ghost justify-start w-full gap-3 px-3 normal-case">
          <Power className="size-5 text-base-content opacity-70"/>Logout
        </button>
        
      </nav>

    </aside>}

    </div> 
  )
}

export default SideBar
