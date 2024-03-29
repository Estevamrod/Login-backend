import {LoginHandler, CadastroHandler, accessVerificationHandler, HomepageHandler, newAccessTokenHandler} from './middleware/middlewares.auth';
import githubRouter from './routes/github.routes';
import googleRouter from './routes/google.routes';
import {Request, Response} from 'express';
import { Application } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app:Application = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST']
}));

app.get('/api/auth/accessVerification', accessVerificationHandler, (req:Request, res:Response) => {
    return res.status(200).json({msg:"Usuario autenticado com sucesso", auth:true});
})
app.use('/api/', googleRouter);
app.use('/api/',githubRouter)
app.get('/', HomepageHandler);
app.post('/api/login', LoginHandler);
app.post('/api/auth/refreshToken', newAccessTokenHandler);
app.post('/api/cadastro', CadastroHandler)

export default app;