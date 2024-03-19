const conn = require('../connect');
const { DataTypes } = require('sequelize');

const GroupModel = conn.define('group',{
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
GroupModel.sync({alter: true});

module.exports = GroupModel;