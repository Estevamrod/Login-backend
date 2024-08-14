import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.database || 'login_back', process.env.user || 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;