import { ILogInData, ILoginResponse, IProfileData, ISignUpData, ISignUpResponse } from "@/app/types";
import toast from "react-hot-toast";


export const signUp = async (signUpData:ISignUpData):Promise<ISignUpResponse> => {
    const response = await fetch("/api/auth/signup",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(signUpData)
    });
    const data = await response.json();
    if (!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message);
    }
    return data;
}

export const login = async (logInData:ILogInData):Promise<ILoginResponse> => {
    const response = await fetch("/api/auth/login",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(logInData)
    });
    const data = await response.json();
    if (!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message || "Login failed");
    }
     return data;
}

// --------- Function to fetch basic user details ---------- //
export const getMe = async () => {

    const response = await fetch('/api/user',{credentials:"include"});

    const data = await response.json();
    
    // To handle the edge case of middleware.ts (not logged in not means as error)
    if (response.status === 401) {
        return null;
    }

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.user;
}

export const logOut = async () => {

    const response = await fetch('/api/auth/log-out',{
        method: "POST",
        credentials:"include"});

    if (!response.ok) {
        toast.error("OOPS something went wrong");
        throw new Error("Logout failed");
    }
}

export const getMyFriends = async () => {
    const response = await fetch('/api/user/friends',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.friends;
}

export const friendsReccomendation = async () => {
    const response = await fetch('/api/user/rcmnd_frnds',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.friendsRcmnded;
}

// --------- Function to fetch all the friends request user send ---------- //
export const getsendFrndRqsts = async () => {
    const response = await fetch('/api/user/send_rqst',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.sendRqsts;
}

// --------- Function to fetch all the friends request the user received---------- //
export const receivedFrndRqsts = async () => {
    const response = await fetch('/api/user/rcd_rqst',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.receivedRqsts;
}

// --------- Function to send a new friend request ---------- //
export const sendFrndRqst = async (receiverId:string) => {
    const response = await fetch('/api/user/send_rqst',{ 
        method:"POST", 
        credentials:"include",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({receiverId})
    });

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }
}

export const acceptFrndRqst = async (senderId:string) => {
     const response = await fetch('/api/user/rcd_rqst/accept',{
        method:"POST", 
        credentials:"include",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({senderId})
    });

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message);
    }
}

export const rejectFrndRqst = async (senderId:string) => {
     const response = await fetch('/api/user/rcd_rqst/reject',{
        method:"DELETE", 
        credentials:"include",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({senderId})
    });

    const data = await response.json();

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }
}

// ----- Getting userdetails for the profile page ----- //
export const getUserDetails = async () =>{
    const response = await fetch('/api/profile',{credentials:"include"});

    const data = await response.json();
    
    // To handle the edge case of middleware.ts (not logged in not means as error)
    if (response.status === 401) {
        return null;
    }

    if(!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message)
    }

    return data.user;
}

// ----- Function to update profile ----- //
export const updateProfile = async (profileData : IProfileData) => {
    const response = await fetch("/api/profile",{
        method: 'PATCH',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(profileData)
    });
    const data = await response.json();

    // To handle the edge case of middleware.ts (not logged in not means as error)
    if (response.status === 401) {
        return null;
    }

    if (!response.ok){
        toast.error("OOPS something went wrong");
        throw new Error(data.message || "Login failed");
    }
     return data.updatedUser;
}

// ----- Function to get the stream Token ----- //
export const getStreamToken = async () => {
    const response = await fetch("/api/stream/token");
    
    const data = await response.json();

    if(!response.ok){
        throw new Error("Failed to get stream token",data.message);
    }

    return data;
}




