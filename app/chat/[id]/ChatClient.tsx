"use client"
import Header from '@/components/page_components/Header';
import ChatLoader from '@/components/page_components/PageLoader';
import { getStreamToken } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat'
import { Chat,ChannelList, Channel, MessageList, MessageInput, ChannelHeader, Window, Thread } from 'stream-chat-react';
import "stream-chat-react/dist/css/v2/index.css";
import FriendsList from '../FriendsList';

const streamChatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!
);

function ChatClient({targetUserId}:{targetUserId:string}) {

  const [ channel, setChannel ] = useState <any> (null);
  
  const { data, isPending, isError } = useQuery({
    queryKey: ["auth", "streamToken"],
    queryFn: getStreamToken,
    staleTime: Infinity
  });

  // Connect user only when token is ready 
  useEffect(()=>{

    if (!data || !targetUserId){
      console.log("No data or targetUserId");
      return;
    }
    
    if (streamChatClient.userID) {
      console.log("Already connected");
      return;
    }

    async function initChat(){
      try {
        // Init stream client
        await streamChatClient.connectUser({id: data.currentUserId},data.streamToken);
        // Create channel
        const channelId = [data.currentUserId,targetUserId].sort().join('_');
        const channel = streamChatClient.channel(
            "messaging",
            channelId,
            {
            members: [data.currentUserId,targetUserId],
        });

        await channel.watch();

        setChannel(channel);
        
      } catch (error) {
        console.log("Stream init error");
      }
    }

    initChat();

    return () => { 
        streamChatClient.disconnectUser();
    };
  },[data,targetUserId]);

  if (isPending || !channel) return <ChatLoader/>

  if (isError) {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span>Couldn't connect to chat</span>
      <span>{isError}</span>
    </div>
    )
  }

  return (
        
        <Chat client={streamChatClient} theme="str-chat__theme-dark">
      
          <Channel channel={channel}>
           
              <Window >
                <ChannelHeader/>
                <MessageList/>
                <MessageInput focus/>
              </Window> 
              
              <Thread /> 
          </Channel>
        </Chat>
  )
}

export default ChatClient