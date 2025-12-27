"use client"

import { useEffect, useState } from "react";
import FriendsList from "../FriendsList";

function FriendsView({direct}:{direct:boolean}) {
      const [view,setView] = useState <string> ("chat");

  const isMobile = typeof Window !== undefined && window.innerWidth < 768;

    useEffect(()=>{
    if (!isMobile || !direct) return;
    const handlePopState = ()=>{
      setView("friends");
    }
    window.addEventListener("popstate",handlePopState);
    return ()=>window.removeEventListener("popstate",handlePopState);
  },[])
  return (
    <>
         {view === "friends" &&
          <aside className="hidden md:block">
            <FriendsList/>
          </aside>}
          </>
  )
}

export default FriendsView
