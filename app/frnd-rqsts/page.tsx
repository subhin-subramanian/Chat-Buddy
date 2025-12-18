"use client"

import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg from '../../assets/profileImg.png'
import Image from "next/image"
import { acceptFrndRqst, receivedFrndRqsts, rejectFrndRqst } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IFriend } from "../types"
import toast from "react-hot-toast"

function page() {

  const queryClient = useQueryClient();

  const { data:FriendRqsts=[] } = useQuery({
  queryKey: ["auth", "rcvdFrndRqsts"],
  queryFn: receivedFrndRqsts
  }); 

  const { mutate:acceptRequestMutation, isPending:acceptPending } = useMutation({
    mutationFn: acceptFrndRqst,
    onSuccess:async()=>{
      queryClient.invalidateQueries({queryKey: ["auth", "friends"]});
      queryClient.invalidateQueries({queryKey: ["auth", "rcvdFrndRqsts"]});
      queryClient.invalidateQueries({queryKey: ["auth", "FrndsRccmnded"]});
      toast.success("New friend added");
    }
  });

  const { mutate:rejectRequestMutation, isPending:rejectPending } = useMutation({
    mutationFn: rejectFrndRqst,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["auth", "rcvdFrndRqsts"]});
      queryClient.invalidateQueries({queryKey: ["auth", "FrndsRccmnded"]});
      toast.error("Request rejected");
    }
  })

  const handleAccept = (reqUserId:string) =>{
    acceptRequestMutation(reqUserId);
  }
  
  const handleReject = (reqUserId:string) => {
    rejectRequestMutation(reqUserId);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-col md:flex-row">
        <SideBar/>
        <div className="m-8 md:m-0 md:w-full space-y-10 p-4 sm:p-6 lg:p-10 border border-gray-600 rounded-xl">
          {FriendRqsts.map((friendRqst : IFriend)=>(
            <div className="lg:p-1 border-b border-gray-700 flex gap-5 items-center" key={friendRqst._id}>
              <span className="flex items-center gap-2">
                <Image src={friendRqst.profilePic && friendRqst.profilePic.trim() !== "" ? friendRqst.profilePic : profileImg} alt="profilePic" rel="noreferrer" 
                       className="rounded-full object-cover shrink-0" width={20} height={20}/>
                <span className="">{friendRqst.userName}</span>
                <span className="text-sm text-gray-400 truncate"> has send you a friend request </span>
              </span>
              <button className="rounded-xl  outline px-3 outline-gray-400 hover:scale-105 duration-300" onClick={()=>handleAccept(friendRqst._id)}>Accept</button>
              <button className="rounded-xl  outline px-3 outline-gray-400 hover:scale-105 duration-300" onClick={()=>handleReject(friendRqst._id)}>Reject</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page

