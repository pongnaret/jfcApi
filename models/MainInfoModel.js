const conn = require('../connect');
const { DataTypes } = require('sequelize');

const MainInfoModel = conn.define('maininfo',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    address: {
        type: DataTypes.STRING(255)
    },
    bookID: {
        type: DataTypes.STRING(255)
    },
    phone: {
        type: DataTypes.STRING(255)
    },
    lineToken: {
        type: DataTypes.STRING(255)
    },

})
MainInfoModel.sync({alter: true});

module.exports = MainInfoModel;