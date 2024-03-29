
# Trabalho back-end de Tela de Login    

Esse trabalho tem como objetivo guardar minha evolução com o decorrer do tempo em relação ao desenvolvimento de projetos mais complexos.
O código tem como foco criar o back-end de uma tela de login, com authenticação pelo Google ou pelo Github e também, gerar um token com tempo limite que após expirar, gera um novo token.

## Funcionalidades

- Possibilitar o cadastro de novos usuários, utilizando criptografia
- Possibilitar o login dos mesmos usuários
- Gerar tokens de acessos e renovação do mesmo
- Possibilitar o login por 2 plataformas externas, Google e Github

## Stack utilizada

**Back-end:** Node, Express, JWT (jose), Github authenticator, Google Authenticator, Sequelize, Bcrypt e Typescript

## Documentação da API

#### Para cadastro

```http
  POST /api/cadastro
```

| Body Schema   | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Tem que ter um nome de usuário. |
| `email` | `string` | **Obrigatório**. Tem que ter um email, contento o dominio. |
| `senha` | `string` | **Obrigatório**. Tem que ter uma senha, não sendo importante o tamanho. |
| `data_nasc` | `Date` | **Obrigatório**. Tem que ter uma data, sendo nesse padrão "aaaa-mm-dd" |

#### Para login

```http
  POST /api/login
```

| Body Schema   | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Tem que ter um email, contento o dominio. |
| `senha` | `string` | **Obrigatório**. Tem que ter uma senha, não sendo importante o tamanho. |

#### Para login com o Google

```http
  POST /api/googleSign
```

| Body Schema   | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `googleToken` | `string` | **Obrigatório**. Você precisa inserir um token retonardo pelo próprio google, que nele possui as informações do usuário |

#### Para login com o Github

```http
  POST /api/github
```

| Body Schema   | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `code` | `string` | **Obrigatório**. Você precisa inserir um token retonardo pelo próprio code, que nele possui as informações do usuário |

**[Github docs](https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)**

#### Para gerar um novo token

```http
  POST /api/auth/refreshToken
```

| Body Schema   | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `oldAccessToken` | `string` | **Obrigatório**. Você precisa inserir o token que expirou |


#### Para verificar se o token expirou

```http
  GET /api/auth/accessVerification
```

| Header Schema | Tipo       | Descrição                          |
| :---------- | :--------- | :---------------------------------- |
| `x-access-token` | `string` | **Obrigatório**. Precisa estar inserido o token de acesso |

#### Retorna todos os items

```http
  GET /
```


## Autores

- [@Estevamrod](https://github.com/Estevamrod)
