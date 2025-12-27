
import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg from '../../assets/profileImg.png'
import { useQuery } from "@tanstack/react-query";
import { getMyFriends } from "@/lib/api";
import { IFriend } from "../types";

function page() {

  const { data:friends=[] } = useQuery({
  queryKey: ["auth", "friends"],
  queryFn: getMyFriends
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header/>
      <div className="flex flex-col md:flex-row bg-base-200">
        <SideBar/>
        <div className="m-8 md:m-0 md:w-full space-y-10 p-4 sm:p-6 lg:p-10 border border-gray-600 rounded-t-xl min-h-screen">
          {friends.map((friend:IFriend)=>(
            <div className="lg:p-1 border-b border-gray-700" key={friend._id}>
              <span className="flex items-center gap-2">
                <img src={friend.profilePic?.trim() || profileImg.src} 
                 alt="Avatar"
                 className="w-[30px] h-[30px] rounded-full object-cover"
                 onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== profileImg.src){
                    img.src = profileImg.src;
                  }
                 }}/>
                <span className="">{friend.userName}</span>
                <span className="text-sm text-gray-400"> has accepted your friend request </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page

