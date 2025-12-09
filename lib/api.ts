export const getMe = async () =>{

    const response = await fetch('/api/auth/me',{credentials:"include"});

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message)
    }

    return data.user;
}