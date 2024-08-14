import { DataTypes } from "sequelize";
import sequelize from "../dbConfig";

const User = sequelize.define(
    'User',
    {
        'id': {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        'username': {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'email': {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'senha': {
            type: DataTypes.TEXT,
            allowNull: false
        },
        'data_nasc': {
            type: DataTypes.DATE,
        }
    }, {
        timestamps: false,
        tableName: 'user'
    }
)

export default User;