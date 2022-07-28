const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
    }, 
    {
        sequelize,
        freezeTableName: true,
        tableName: 'comment',
        underscored: true
    }
);

module.exports = Comment;