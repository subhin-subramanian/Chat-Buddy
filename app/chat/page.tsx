
import FriendsList from "./FriendsList"
import LastChatPrvw from "./LastChatPrvw"


function page() {

  return (
    //  Friends list and chat view available on big screens, only firendlist on small screens
    <div className="h-screen bg-black p-10 sm:px-[10vw] md:px-[15vw] rounded-xl">
        <div className="h-full overflow-hidden flex rounded-xl border border-gray-800">
            
            <aside className="">
                <FriendsList/>
            </aside>

            <main className="hidden md:flex flex-1 border-l border-gray-800">
                <LastChatPrvw/>
            </main>
         
        </div>
    </div>
      


  )
}

export default page
