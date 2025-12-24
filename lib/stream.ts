import { StreamChat } from "stream-chat";

interface IUserData {
    id: string;
    name: string;
    image?: string;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET;

if (!apiKey || !apiSecret) {
    console.log("Stream credentials missing");
    process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData:IUserData) => {
    try {
      const response = await streamClient.upsertUser(userData);
      return response;
    } catch (error) {
      console.log("Error in creating stream user",error);
    }
}

export const generateStreamToken = (userId:string)=>{
    try {
        return streamClient.createToken(userId);
    } catch (error) {
        console.error("Error in generating stream token", error);
    }
}