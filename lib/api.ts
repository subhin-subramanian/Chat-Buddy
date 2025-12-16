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

