const conn = require('../connect');
const { DataTypes } = require('sequelize');

const ChangEventUserModel = conn.define('changeventuser',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateChang: {
        type: DataTypes.DATE()
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
    eventUserId: {
        type: DataTypes.INTEGER(5)
    },
    eventId: {
        type: DataTypes.INTEGER(5)
    },
    giveUserId: {
        type: DataTypes.INTEGER(5)
    },
    giveName: {
        type: DataTypes.STRING(255)
    },
    ReceiveName: {
        type: DataTypes.STRING(255)
    },
    ReceiveUserId: {
        type: DataTypes.INTEGER(5)
    },
    status: {
        type: DataTypes.INTEGER(1)
    },
    approve: {
        type: DataTypes.INTEGER(1)
    },

})
ChangEventUserModel.sync({alter: true});

module.exports = ChangEventUserModel;