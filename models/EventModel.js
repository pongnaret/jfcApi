const conn = require('../connect');
const { DataTypes } = require('sequelize');

const EventModel = conn.define('Event',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    type: {
        type: DataTypes.STRING(255)
    },
    color: {
        type: DataTypes.STRING(255)
    },
    detail: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.INTEGER(1)
    },

})
EventModel.sync({alter: true});

module.exports = EventModel;