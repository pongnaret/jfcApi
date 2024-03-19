const conn = require('../connect');
const { DataTypes } = require('sequelize');

const EventUserModel = conn.define('eventuser',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255)
    },
    start: {
        type: DataTypes.DATE()
    },
    end: {
        type: DataTypes.DATE()
    },
    allDay: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true
    },
    color: {
        type: DataTypes.STRING(255)
    },
    eventId: {
        type: DataTypes.INTEGER(5)
    },
    userId: {
        type: DataTypes.INTEGER(5)
    },
    status: {
        type: DataTypes.INTEGER(1)
    },
    changID: {
        type: DataTypes.INTEGER(5)
    },


})
EventUserModel.sync({alter: true});

module.exports = EventUserModel;