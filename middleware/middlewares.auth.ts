import {Request, Response, NextFunction} from 'express';
import User from '../config/Model/model.sequelize';
import Crypt from '../api/auth/api.auth.crypt';
import Token from '../api/auth/api.auth.jwt';
import { JWTVerifyResult } from 'jose';

const token = new Token();
const crypt = new Crypt(11);

type Userinfo = {
    username: string,
    email: string,
    senha: string,
    dataNasc: string
}

const LoginHandler = async(req:Request, res:Response) => {
    const {email, senha}:Userinfo = req.body;
    try {
        const users:any = await User.findAll({
            where: {
                email: email
            }
        });
        if (users.length > 0) {
            const compare = crypt.compare(senha, users[0].senha);
            const newToken:string = await token.login({id:users[0].id});
            console.log(`compare => ${compare}`);
            if (compare) {
                return res.status(200).json({msg:'Usuario logado com sucesso', token:newToken, uid:users[0].id, allowed:true});
            } else {
                return res.status(200).json({msg:'Algum dos dados está incorreto! Por favor, tente novamente.', allowed:false});
            }
        } else {
            return res.status(203).json({msg:'Usuario não encontrado!', allowed:false});
        }
    } catch(e){ 
        console.log(e);
        return res.status(403);
    }
}   
const CadastroHandler = async(req:Request, res:Response) => {
    const {username, email, senha, dataNasc}:Userinfo = req.body;
    try {
        const users = await User.findAll({
            where: {
                email:email
            }
        });
        console.log(users);
        if (users.length == 0) {
            console.time('hash');
            const hash = crypt.hash(senha);
            console.timeEnd('hash');
            
            const AccountSave = await User.create({
                username: username,
                email: email,
                senha:hash,
                data_nasc: dataNasc
            });
            if (AccountSave) {
                console.log('true');
                return res.status(200).json({msg:'Cadastro realizado com sucesso!', allowed:true});
            } else {
                return res.status(203).json({msg:'Ocorreu um erro de comunicação entre o usuário e o servidor, por favor tente novamente!', allowed:false});
            }
        } else {
            return res.status(200).json({msg:'Usuário já cadastrado!', allowed:false});
        }
    } catch (e) {
        console.log('ahahaha');
        console.log(e);
        // return res.status(401);
    }
}
const accessVerificationHandler = async(req: Request, res:Response, next:NextFunction) => {
    const headerToken = req.headers['x-access-token'] as string;
    try {
        if (!headerToken) return res.status(203).json({msg:"Voce nao esta logado!", auth: false});
        token.verification(headerToken)
        .then((value:JWTVerifyResult) => {
            User.findAll({
                attributes: ['id'],
                where: {
                    id: value.payload.id
                }
            }).then((value:any) => {
                if (value.length > 0) {
                    req.userId = value[0].id;
                    next();
                }
            }).catch((reason:any) => {
                console.log(reason);
                return res.status(401);
            })
        }).catch((e) => {
            if (e.claim) {
                return res.status(203).json({msg:"Tempo maximo de token expirado", auth:true, tokenExp: true});
            } else {
                return res.status(203).json({msg:"Nao foi possivel autenticar o usuario!", auth:false, tokenExp: false});
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(403);
    }
}
const newAccessTokenHandler =  async(req:Request, res:Response) => {
    const {oldToken} = req.body;
    if (!oldToken) return res.status(401);
    const decodedExp = token.decoded(oldToken).exp as number;
    if (Date.now() >= decodedExp * 1000) {
        const newAcessToken = await token.login({id:req.userId});
        return res.status(200).json({msg:"Novo token criado com sucesso!",token:newAcessToken, id:req.userId});
    }
}
const HomepageHandler = async(req:Request, res:Response) => {
    try {
        const user = await User.findAll();
        if (user.length > 0) {
            return res.status(200).json({msg:'Carregando', res:user});
        } else {
            return res.status(200).json({msg:'Vazio'});
        }
    } catch (e) {
        console.log(e);
        return res.status(203).json({msg:'Ocorreu um erro, por favor tente novamente!!'});
    }
}
export {LoginHandler, CadastroHandler, HomepageHandler, accessVerificationHandler, newAccessTokenHandler};