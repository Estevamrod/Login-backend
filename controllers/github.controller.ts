import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type AccessTokenData = {
    access_token:string,
    token_type:string,
    scope:string
} | undefined

type userData = { 
    email:string,
    primary: boolean,
    verified: boolean,
    visibility: string | null
} | undefined

const GetAcessToken = async(code:string):Promise<AccessTokenData> => {
    try {
        const {data} = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUBCLIENTID as string}&client_secret=${process.env.GITHUBSECRETID as string}&code=${code}`,{}, {
            headers:{
                Accept: "application/json"
            }
        });
        return data;
    }catch(e) {
        console.log(e);
        return;
    }
}

const GetUserData = async(accessToken:string):Promise<userData> => {
    try {
        const {data} = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept:"application/vnd.github+json"
            }
        });
        return data;
    } catch(e) {
        console.log(e);
        return;
    }
}
export {GetAcessToken, GetUserData};