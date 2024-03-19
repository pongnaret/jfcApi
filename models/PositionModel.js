const conn = require('../connect');
const { DataTypes } = require('sequelize');

const PositionModel = conn.define('position',{
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
PositionModel.sync({alter: true});

module.exports = PositionModel;