"use client"

import { IFriend } from "@/app/types";
import { getMyFriends } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import profileImg  from '../../assets/profileImg.png'

function FriendsList() {

  const { data:friends=[] } = useQuery({
    queryKey: ["auth", "friends"],
    queryFn: getMyFriends
  });

  return (
    <div className="flex flex-col w-screen md:w-[20vw] px-5 border-r border-gray-800">
      {friends.map((friend:IFriend)=>(
        <Link href={`/chat/${friend._id}`} className="flex gap-3 h-20 items-center border-b border-gray-800" 
              key={friend._id}>
          <img 
            src={friend.profilePic?.trim() || profileImg.src} 
            alt="Avatar" 
            className="w-[30px] h-[30px] rounded-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== profileImg.src){
                img.src = profileImg.src;
              }
            }}/>
          <span className="truncate">{friend.userName}</span>
        </Link>
      ))}
      
    </div>
  )
}

export default FriendsList

