
import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg from '../../assets/profileImg.png'
import Image from "next/image"

function page() {

  let friends = [
    {_id:1, userName:"username", profilePic:profileImg, date:"12/5/10"},
    {_id:1, userName:"username", profilePic:profileImg, date:"12/5/10"},
    {_id:1, userName:"username", profilePic:profileImg, date:"12/5/10"},
    {_id:1, userName:"username", profilePic:profileImg, date:"12/5/10"},
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-col md:flex-row">
        <SideBar/>
        <div className="m-8 md:m-0 md:w-full space-y-10 p-4 sm:p-6 lg:p-10 border border-gray-600 rounded-xl">
          {friends.map((friend)=>(
            <div className="lg:p-1 border-b border-gray-700" key={friend._id}>
              <span className="flex items-center gap-2">
                <Image src={friend?.profilePic || profileImg} alt="profilePic" rel="noreferrer" 
                       className="w-[30px] h-[30px] rounded-full object-cover"/>
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

