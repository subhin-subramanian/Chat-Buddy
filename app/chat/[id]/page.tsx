import ChatClient from "./ChatClient";

async function page({params}:{params: Promise<{id:string}> }) {

  const { id } = await params;

  return (
    <ChatClient targetUserId={id}/>
  )
}

export default page
