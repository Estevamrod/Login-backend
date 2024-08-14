import http from 'http';
import app from './app';
import sequelize from './config/dbConfig';

const server = http.createServer(app);
const port:number = 1024 || process.env.PORT;

server.listen(port, async() => {
    try {   
        await sequelize.authenticate();
        console.log(`Conexão realizada com sucesso!`);
    }catch(e) {
        console.log(e);
    }
    console.log(`running in http://localhost:${port};`);
});
