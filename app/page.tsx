import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg  from '../assets/profileImg.png'
import Image from "next/image"

function page() {

  



  let friends = [
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"}
  ]

  let users = [
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"},
    {_id:1, userName:"username", profilePic:profileImg, bio: "Hello this is my bio"}
  ]

  return (
    <div className="flex flex-col">

      <Header/>

      <div className="flex flex-col md:flex-row">

        <SideBar/>

        <div className="container mx-auto space-y-10 p-4 sm:p-6 lg:p-8">
          {/* Friends section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
            {friends.length === 0 ? (
               <div className="bg-base-200 p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">No Friends Yet</h3>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
                {friends.map((friend)=>(
                  <div className="bg-base-200 border border-gray-600 rounded-xl hover:shadow-md transition-shadow p-4 flex flex-col gap-3" key={friend._id}>
                    <div className="flex items-center gap-3 mb-3">
                      <Image src={friend?.profilePic || profileImg } alt="User Avatar" rel="noreferrer" 
                        className="w-[30px] h-[30px] rounded-full object-cover"/>
                      <h3 className="font-semibold truncate">{friend.userName}</h3>
                    </div>
                    <p className="opacity-50 text-sm truncate">{friend?.bio}</p>
                    <button className="mx-auto rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 outline px-6 py-1 outline-gray-400">Message</button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Users Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recommendations</h2>
            <p className="opacity-50">Connect with new people and make new friends</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
              {users.map((user)=>(
                <div className="bg-base-200 border border-gray-600 rounded-xl hover:shadow-md transition-shadow p-4 flex flex-col gap-3" key={user._id}>
                  <div className="flex items-center gap-3 mb-3">
                    <Image src={user?.profilePic || profileImg } alt="User Avatar" rel="noreferrer" 
                      className="w-[30px] h-[30px] rounded-full object-cover"/>
                    <h3 className="font-semibold truncate">{user.userName}</h3>
                  </div>
                  <p className="opacity-50 text-sm truncate">{user?.bio}</p>
                  <button className="mx-auto rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 outline px-6 py-1 outline-gray-400">Send Request</button>
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
