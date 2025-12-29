"use client"

import Header from "@/components/Header"
import SideBar from "@/components/SideBar"
import profileImg  from '../assets/profileImg.png'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { friendsReccomendation, getMyFriends, getsendFrndRqsts, sendFrndRqst } from "@/lib/api"
import { IFriend } from "./types"
import toast from "react-hot-toast"
import Link from "next/link"

function page() {

  const queryClient = useQueryClient();

  const { data:friends=[] } = useQuery({
    queryKey: ["auth", "friends"],
    queryFn: getMyFriends
  });
  
  const { data:FrndsRccmnded=[] } = useQuery({
    queryKey: [ "auth", "FrndsRccmnded"],
    queryFn: friendsReccomendation
  });

  const { data:FrndRqstsSend=[] } = useQuery({
    queryKey: ["auth", "FrndRqstsSend"],
    queryFn: getsendFrndRqsts
  })

  const { mutate:sendRequestMutation, isPending:rqstSendPending} = useMutation <void,Error,string>({
    mutationFn: sendFrndRqst,
    onSuccess:()=>{
      toast.success("Friend request send");
      queryClient.invalidateQueries({queryKey:["auth", "FrndRqstsSend"]});
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  });

  const handleSendRequest = (userId:string) =>{
    sendRequestMutation(userId);
  }

  return (
    <div className="flex flex-col pt-16">

      <Header/>

      <div className="flex flex-col md:flex-row">

        <SideBar/>

        <div className="container mx-auto space-y-10 p-10 sm:p-6 lg:p-8 bg-base-200 min-h-screen">
          {/* Friends section */}
          <section className="shadow-gray-700 shadow-md p-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
            {friends.length === 0 ? (
               <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">No Friends Yet</h3>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
                {friends.map((friend: IFriend)=>(
                  <div className="bg-base-200 border border-gray-600 rounded-xl hover:shadow-md 
                                  transition-shadow p-4 flex flex-col gap-3" key={friend._id}>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={friend.profilePic?.trim() || profileImg.src}
                        alt="Avatar"
                        className="w-[30px] h-[30px] rounded-full object-cover"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src !== profileImg.src) {
                            img.src = profileImg.src;
                          }
                        }}
                      />
                    <h3 className="font-semibold truncate">{friend.userName}</h3>
                    </div>
                    <p className="opacity-50 text-sm truncate">{friend?.bio}</p>
                    <Link href={`/chat/${friend._id}`} className="mx-auto rounded-2xl transition-transform duration-300 ease-in-out 
                      hover:scale-110 outline px-6 py-1 outline-gray-400">Message</Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Users Section */}
          <section className="shadow-gray-700 shadow-md p-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recommendations</h2>
            <p className="opacity-50">Connect with new people and make new friends</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
              {FrndsRccmnded.map((frnd: IFriend)=>(
                <div className="bg-base-200 border border-gray-600 rounded-xl hover:shadow-md transition-shadow p-4 flex flex-col gap-3" key={frnd._id}>
                  <div className="flex items-center gap-3 mb-3">
                    <img  
                      src={frnd.profilePic?.trim() || profileImg.src} 
                      alt="Avatar"
                      className="w-[30px] h-[30px] object-cover rounded-full"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== profileImg.src){
                          img.src = profileImg.src;
                        }
                      }} />
                    <h3 className="font-semibold truncate">{frnd.userName}</h3>
                  </div>
                  <p className="opacity-50 text-sm truncate">{frnd?.bio}</p>
   
                  <button className="mx-auto rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 outline px-6 py-1 outline-gray-400"
                          onClick={()=>handleSendRequest(frnd._id)}>
                      { FrndRqstsSend.includes(frnd._id) ? "Req Pending" : "Send Request" }
                  </button>

                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default page
