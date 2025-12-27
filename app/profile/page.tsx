"use client"

import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg from '../../assets/profileImg.png'
import Image from "next/image"
import { FormEvent, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserDetails, updateProfile } from "@/lib/api"
import { IProfileData } from "../types"
import toast from "react-hot-toast"

function page() {

  const [ profileData, setProfileData ] = useState <IProfileData> ({ 
    userName: '',
    email: '', 
    bio: '',
    profilePic: ''
  });
  const queryClient = useQueryClient();

  const { data:user } = useQuery({
    queryKey: ["auth", "updateUser"],
    queryFn: getUserDetails,
    staleTime: 1000 * 60 * 5,
    retry: false
  });

  useEffect(()=>{
    if (!user) return;
    setProfileData(prev => ({
      ...prev,  
    userName: user.userName,
    email: user.email, 
    bio: user.bio ?? "",
    profilePic: user.profilePic ?? profileImg
  }));
  },[user])

  const { mutate:updateProfileMutation,isPending,error } = useMutation <IProfileData,Error,IProfileData>({
    mutationFn: updateProfile,
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey:["auth", "user"]});
      queryClient.invalidateQueries({queryKey:["auth", "updateUser"]});
      toast.success("Profile updated");
    },
    onError:(error) =>{
      toast.error(error.message);
    }
  }) 

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation(profileData);
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">

      <Header/>

      <div className="flex flex-col md:flex-row bg-base-200">

        <SideBar/>

        <div className="border border-gray-600 rounded-t-xl min-h-screen w-screen p-10 mx-auto">

            <form onSubmit={handleSubmit} className="mx-auto shadow-2xl shadow-blue-500 rounded-2xl w-sm sm:w-md space-y-3 p-5 md:p-10">
              
              {/* ProfilePicture */}
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                <Image src={profileData.profilePic || profileImg} alt="ProfileImg" 
                      width={80} height={80} className="w-full h-full object-cover"/> 
              </div>

              {/* Username */}
              <div className="w-full">
                <label className="label" htmlFor='userName'>
                  <span className="label-text">UserName</span>
                </label>
                <input 
                    type="text" 
                    id='userName'
                    className='input input-bordered w-full'
                    value={profileData.userName}
                    onChange={(e) => setProfileData({ ...profileData,userName:e.target.value})}/>
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label" htmlFor='email'>
                  <span className="label-text">Email</span>
                </label>
                <input 
                    type='email'
                    id='email'
                    className='input input-bordered w-full'
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData,email:e.target.value})}/>
              </div>

              {/* Bio */}
              <div className="w-full">
                <label className="label" htmlFor='bio'>
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                    maxLength={600}
                    id='bio'
                    className='input border-2 w-full h-32'
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData,bio:e.target.value})}/>
              </div>

              <button className='btn btn-primary w-full' type='submit'>
                    {isPending ? 
                    <>
                      <span className='loading loading-spinner loading-xs'>Updating Profile....</span>
                    </>: "Update"}
              </button> 

            </form>

        </div>

      </div>
    </div>
  )
}

export default page

