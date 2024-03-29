import express from 'express';
import User from '../config/Model/model.sequelize';
import Token from '../api/auth/api.auth.jwt';
import {Request, Response} from 'express';

const router = express.Router();
const token = new Token();

router.post('/googleSign', async(req:Request, res:Response) => {
    const {googleToken} = req.body;
    if (!googleToken) return res.status(403);
    const {email, email_verified} = token.decoded(googleToken);
    if (email_verified == true) {
        try {
            const users:any = await User.findAll({
                attributes: ['id'],
                where: {
                    email: email
                }
            });
            if (users.length > 0) {
                const accessToken = await token.login({id:users[0].id});
                if (accessToken) {
                    return res.status(200).json({msg:'Usuario logado com sucesso!', auth:true, token:accessToken, uid:users[0].id});
                }
            } else {
                return res.status(200).json({msg:'Nenhum usuário encontrado!', auth:false});
            }
        } catch(e){
            console.log(e);
            return res.status(203);
        }
    } else {
        return res.status(200).json({msg:"Email google nao verificado!", auth:false, email_verified:email_verified});
    }
});

export default router;