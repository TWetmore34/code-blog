const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class User extends Model {}

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        },
    }
    },
    {
        
        hooks: {
            async beforeCreate (newUserData) {
                const newPass = await bcrypt.hash(newUserData.password, 8)
                newUserData.password = newPass
                return newPass;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    
    }
)

module.exports = User