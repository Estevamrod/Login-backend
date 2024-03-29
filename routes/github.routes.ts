import express from 'express';
import User from '../config/Model/model.sequelize';
import Token from '../api/auth/api.auth.jwt'
import {Request, Response} from 'express';
import {GetAcessToken, GetUserData} from '../controllers/github.controller';
const router = express.Router();

const token = new Token();

router.post('/github', async(req:Request, res:Response) => {
    const {code} = req.body;
    if (!code) return res.status(403);
    GetAcessToken(code as string).then((response:any) => {
        return res.status(200).json({access_token:response.access_token, GetAcessToken:true});
    }).catch((e) => {
        console.log("/github");
        return e;
    })
});

router.get('/userData', (req:Request, res:Response) => {
    const accessToken:string = (req.headers['x-access-token'] as string).split(" ")[1];
    console.log(`accessToken => ${accessToken}`);
    if (!accessToken) return res.status(403);
    GetUserData(accessToken).then(async(response:any) => {
        if (response[0].primary == true && response[0].verified == true) {
            try {
                const users:any = await User.findAll({
                    attributes: ['id'],
                    where: {
                        email: response[0].email
                    }
                });
                if (users.length > 0) {
                    const newTokenaccess = await token.login({id:users[0].id});
                    if (newTokenaccess) {
                        return res.status(200).json({msg:'Usuario logado com sucesso!', auth:true, token:newTokenaccess, uid:users[0].id});
                    }
                } else {
                    return res.status(200).json({msg:'Usuario não encontrado!', auth:false});
                }
            } catch(e){
                console.log(e);
                return res.status(203);
            }
        } else {
            return res.status(203).json({msg:"Email github nao verificado!", auth:false, email_verified:response[0].verified});
        }
    }).catch((e) => {
        console.log("error no userData");
        console.log(e);
    })
});
export default router;