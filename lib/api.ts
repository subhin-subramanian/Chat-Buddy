import { ILogInData, ILoginResponse, ISignUpData, ISignUpResponse } from "@/app/types";


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
        throw new Error(data.message || "Login failed");
    }
     return data;
}

// --------- Function to fetch basic user details ---------- //
export const getMe = async () => {

    const response = await fetch('/api/user',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }

    return data.user;
}


export const logOut = async () => {

    const response = await fetch('/api/auth/log-out',{
        method: "POST",
        credentials:"include"});

    if (!response.ok) {
        throw new Error("Logout failed");
    }
}

export const getMyFriends = async () => {
    const response = await fetch('/api/user/friends',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }

    return data.friends;
}

export const friendsReccomendation = async () => {
    const response = await fetch('/api/user/rcmnd_frnds',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }

    return data.friendsRcmnded;
}

export const getsendFrndRqsts = async () => {
    const response = await fetch('/api/user/send_rqst',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }

    return data.sendRqsts;
}

export const sendFrndRqst = async (userId:string) => {
    const response = await fetch('/api/user/send_rqst',{ 
        method:"POST", 
        credentials:"include",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userId)
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }
}

export const acceptFrndRqst = async () => {}

export const rejectFrndRqst = async () => {}

export const receivedFrndRqsts = async () => {}



