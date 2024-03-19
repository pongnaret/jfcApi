const conn = require('../connect');
const { DataTypes } = require('sequelize');

const UserModel = conn.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: DataTypes.STRING(255)
    },
    lname: {
        type: DataTypes.STRING(255)
    },
    username: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255)
    },
    level: {
        type: DataTypes.STRING(255)
    },
    signature: {
        type: DataTypes.STRING(255)
    },
    comment: {
        type: DataTypes.STRING(255)
    },
    linetoken: {
        type: DataTypes.STRING(255)
    },
    prefixId: {
        type: DataTypes.INTEGER(5)
    },
    positionId: {
        type: DataTypes.INTEGER(5)
    },
    status: {
        type: DataTypes.INTEGER(1)
    },

})
UserModel.sync({alter: true});

module.exports = UserModel;