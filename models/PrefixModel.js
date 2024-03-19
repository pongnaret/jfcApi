const conn = require('../connect');
const { DataTypes } = require('sequelize');

const PrefixModel = conn.define('prefix',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.INTEGER(1)
    },

})
PrefixModel.sync({alter: true});

module.exports = PrefixModel;