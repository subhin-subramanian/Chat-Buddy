import FriendsList from "../FriendsList";
import ChatClient from "./ChatClient";

async function page({params}:{params: Promise<{id:string}> }) {
  const { id } = await params;
  
  return (
      <div className="h-screen bg-black p-10 sm:px-[10vw] md:px-[15vw] rounded-xl">
        <div className="h-full overflow-hidden flex rounded-xl border border-gray-800">
          <aside className="hidden md:block">
            <FriendsList/>
          </aside>        
          <main className="flex-1 border-l border-gray-800">
            <ChatClient targetUserId={id}/>
          </main>
        </div>
      </div>
  )
}

export default page
