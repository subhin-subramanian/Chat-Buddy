"use client"

import { BellIcon, HomeIcon, MessagesSquare, UserIcon } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api";
import { usePathname } from "next/navigation";
import Image from "next/image";
import profileImg  from '../../assets/profileImg.png'

function SideBar() {

  const { data:user } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe, 
  });

  const currentPath = usePathname();

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0">

      <nav className="flex-1 p-4 space-y-1">
        <Link href='/' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "bg-gray-700" : ""}`}>
          <HomeIcon className="size-5 text-base-content opacity-70"/>
          <span>Home</span>
        </Link>
        <Link href='/friends' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/friends' ? "bg-gray-700" : ""}`}>
          <UserIcon className="size-5 text-base-content opacity-70"/>
          <span>Friend Requests</span>
        </Link>
        <Link href='/notifications' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "bg-gray-700" : ""}`}>
          <BellIcon className="size-5 text-base-content opacity-70"/>
          <span>Notifications</span>
        </Link>
        <Link href='/notifications' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/chat' ? "bg-gray-700" : ""}`}>
          <MessagesSquare className="size-5 text-base-content opacity-70"/>
          <span>Chat</span>
        </Link>
        
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
            <Image src={user?.profilePic || profileImg } alt="User Avatar" rel="noreferrer" 
               className="w-[30px] h-[30px] rounded-full object-cover"/>
            <div className="flex-1">
                <p className="font-semibold text-sm">{user?.userName}</p>
                <p className="text-xs text-success flex items-center gap-1">
                    <span className="size-2 rounded-full bg-success inline-block">Online</span>
                </p>
            </div>
        </div>
      </div>

    </aside>
  )
}

export default SideBar
