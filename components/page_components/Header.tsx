'use client'

import Link from "next/link"
import Logo from "./Logo"
import { BellIcon, LogOutIcon } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, logOut } from "@/lib/api"
import profileImg  from '../../assets/profileImg.png'
import { useRouter } from "next/navigation";

function Header() {

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data:user} = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const { mutate:logOutMutation, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess: ()=>{
      queryClient.removeQueries({queryKey:["authUser"]});
      router.push("/auth/login")
    }
  })

  const handleLogout = ()=>{
     logOutMutation();
  }

  return (
    <div className="w-full flex px-12 sm:px-10 py-5 justify-between">

      <Logo/>

      <div className="flex gap-5 items-center">
          <Link href='/notifications'>
            <BellIcon/>
          </Link>

          <Link href='/profile'>
            <img src={user?.profilePic || profileImg.src} alt="User Avatar"
                  className="w-[30px] h-[30px] rounded-full object-cover"/>
          </Link>

          <button className="cursor-pointer">
            {isPending ?
              <div className="h-8 w-8 rounded-full border border-blue-300 border-t-blue-600 animate-spin"></div> :
            <LogOutIcon onClick={handleLogout}/>}
          </button>
      </div>

    </div>
  )
}

export default Header
