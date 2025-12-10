"use client"

import Header from "@/components/page_components/Header"
import SideBar from "@/components/page_components/SideBar"
import profileImg from '../../assets/profileImg.png'
import Image from "next/image"
import { useState } from "react"

interface IProfileData {
    userName: string,
    email: string,
    password: string,
    bio: string,
    profilePic: string
}

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

  const [ profileData, setProfileData ] = useState <IProfileData> ({ 
    userName: '',
    email: '', 
    password: '',
    bio: '',
    profilePic: ''
  });

  return (
    <div className="flex flex-col min-h-screen">

      <Header/>

      <div className="flex flex-col md:flex-row">

        <SideBar/>

        <div className="mx-auto m-8">
          <form className="shadow-2xl shadow-blue-500 rounded-2xl w-sm sm:w-xl space-y-10 p-5 md:p-15">
            
            {/* ProfilePicture */}
            <div className="w-30 h-30 rounded-full overflow-hidden mx-auto">
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
                  placeholder='Change your username'
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
                  placeholder='Enter your email'
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData,email:e.target.value})}/>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="label" htmlFor='password'>
                <span className="label-text">Password</span>
              </label>
              <input 
                  type='password'
                  id='password'
                  className='input border-2 w-full'
                  placeholder='Enter a password'
                  value={profileData.password}
                  onChange={(e) => setProfileData({ ...profileData,password:e.target.value})}/>
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
            <button className='btn btn-primary w-full'>Update</button>

            {/* <button className='btn btn-primary w-full' type='submit'>
                  {isPending ? 
                  <>
                    <span className='loading loading-spinner loading-xs'>Updating Profile....</span>
                  </>: "Update"}
            </button> */}

          </form>
        </div>

      </div>
    </div>
  )
}

export default page

