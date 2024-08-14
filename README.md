# Back-end para tela de Login
O respositório desse trabalho é, essencialmente, para demonstrar todas as configurações e tecnologias aplicadas para a realização desse projeto. Além de servir como uma porta para discussões de boas práticas. 
Esse projeto é totalmente de cunho exemplificativo, por isso o arquivo ".env" não foi ignorado no momento do push a nuvem.

## Tecnologias utilizadas

* ![Typescript](https://img.shields.io/npm/v/typescript?color=blue&label=Typescript&logo=typescript&logoColor=blue)
* ![NodeJs](https://img.shields.io/npm/v/node?color=green&label=Nodejs&logo=nodedotjs&logoColor=green)
* ![Express](https://img.shields.io/npm/v/express?color=green&label=Express&logo=express&logoColor=green)
* ![Sequelize](https://img.shields.io/npm/v/sequelize?color=blue&label=Sequelize&logo=sequelize&logoColor=blue)
* ![Axios](https://img.shields.io/npm/v/axios?color=purple&label=Axios&logo=axios&logoColor=purple)
* ![Bcrypt](https://img.shields.io/npm/v/bcrypt?color=red&label=Bcrypt&logo=bcrypt&logoColor=red)
* ![JWT](https://img.shields.io/npm/v/jsonwebtoken?color=black&label=Nodejs&logo=jsonwebtokens&logoColor=black)
* ![dotenv](https://img.shields.io/npm/v/dotenv?color=black&label=dotenv&logo=dotenv&logoColor=white)
* ![cors](https://img.shields.io/npm/v/jsonwebtoken?color=black&label=cors&logoColor=black)
* ![MySql](https://img.shields.io/npm/v/mysql?color=yellow&label=MySql&logo=mysql&logoColor=yellow)

## Instalação

```git
git clone https://github.com/Estevamrod/Login-backend.git
```
```Console
cd Login_backend/
```
```Typescript
npm install
```

Após esses pasos terem sido realizados, antes de iniciar o servidor precisa-se criar um banco de dados com o nome 'login_back' e após isso, 
criar uma tabela chamada 'user'. No exemplo abaixo estarei deixando o código em mysql para tal ação.

```Console
CREATE DATABASE `login_back`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(300) NOT NULL,
  `data_nasc` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

Após esse passo pode-se iniciar o servidor backend.

```Typescript
npm run dev:back
```

## Autor
<div style="display:flex; flex-direction:column; justify-content:center">
    <img src="https://avatars.githubusercontent.com/u/115419827?v=4" style="border-radius:50%; width:60px"/>
    <a href="https://www.github.com/Estevamrod" target="_blank">
        <span style="margin-top:12px">Estevamrod</span>
    </a>
</div>

