"use client"

import { useParams } from "next/navigation"
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  type User,
  StreamTheme,
  useCall,
  StreamVideoParticipant,
  ParticipantView,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useQuery } from "@tanstack/react-query";
import { getMe, getStreamToken } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChatLoader from "@/components/PageLoader";

function page() {
  const params = useParams<{id:string}>();
  const callId = params.id;
  const [client,setClient] = useState <any> ();
  const [call,setCall] = useState <any> ();
  const [isConnecting, setIsConnecting] = useState <boolean> (true);
  
  // Getting details of the currentUser
  const { data:currentUser, isLoading:userLoading} = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // Getting stream token
   const { data:token, isLoading:tokenLoading } = useQuery({
      queryKey: ["auth", "streamToken"],
      queryFn: getStreamToken,
      enabled: !!currentUser,
      staleTime: Infinity
  });

  useEffect(()=>{

    const intiCall = async()=>{

      if(!token.streamToken || !currentUser || !callId){
        console.log("!token.streamToken || !currentUser || !callId");
        return;
      }

      try {
        console.log("Initializing stream video client....");
        
        const user = {
            id: currentUser._id,
            name: currentUser.userName,
            image: currentUser.profilePic
        }

        let streamToken = await token.streamToken;

        const videoClient = new StreamVideoClient({ 
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!, 
            user, 
            token: streamToken
        });

        const callInstance = videoClient.call("default",callId);
        await callInstance.join({create:true});
        console.log("call joined");
        setClient(videoClient);
        setCall(callInstance);

      } catch (error) {
        console.log("Stream video init error");
        toast.error("OOps something went wrong!")
      } finally {
        setIsConnecting(false);
      }
    }

    intiCall();
  },[token,currentUser,callId]);

  if (userLoading || tokenLoading || isConnecting) return <ChatLoader/>

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout/>
      </StreamCall>
    </StreamVideo>
  )
}

export default page

export const MyUILayout = ()=>{
    const { useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
      return <div className="">Loading...</div>
    }

    return (
      <StreamTheme>
        <SpeakerLayout/>
        <CallControls/>
      </StreamTheme>
    );
};
