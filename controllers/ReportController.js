const express = require("express");
const { Op } = require("sequelize");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require("./Service");
const UserModel = require("../models/UserModel");
const EventModel = require("../models/EventModel");
const PositionModel = require("../models/PositionModel");
const EventUserModel = require("../models/EventUserModel");
const ChangEventUserModel = require("../models/ChangEventUserModel");



app.get("/report/list", Service.isLogin, async (req, res) => {
  try {
    EventUserModel.belongsTo(EventModel);
    EventUserModel.belongsTo(UserModel);

    const results = await EventUserModel.findAll({
      //const results = await UserModel.findAll({
      where: {
        status: {
          [Op.or]: [1, 2],
        },
      },
      attributes: ["start", "title"],
      order: [["start", "ASC"]],
      include: [
        {
          model: UserModel,
          attributes: ["fname", "lname"],
        },
        {
          model: EventModel,
          attributes: ["name", "id"],
        },
      ],
    });
    res.send({ message: "success", results: results });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

app.get("/report/dataByDate/:startDay/:endDay/:Event", async (req, res) => {
  try {
    let arr = [];
    let startD = req.params.startDay;
    let endD = req.params.endDay;
    let eventID = req.params.Event;

    const endDate = new Date(endD); // สร้างวัตถุ Date ใหม่โดยใช้วัตถุ Date ปัจจุบัน
    endDate.setDate(endDate.getDate() + 1);
    //console.log(whereCondition);

    EventUserModel.belongsTo(EventModel);
    EventUserModel.belongsTo(UserModel);

    const whereCondition = {
      start: {
        [Op.between]: [startD, endDate],
      },
      status: {
        [Op.or]: [1, 2],
      },
    };

    if (eventID !== '0') {
      whereCondition.eventId = {
        [Op.eq]: eventID,
      };
    }

    const results = await EventUserModel.findAll({
      where: whereCondition,
      attributes: ["start", "title"],
      order: [["start", "ASC"]],
      include: [
        {
          model: UserModel,
          attributes: ["fname", "lname"],
        },
        {
          model: EventModel,
          attributes: ["name", "id"],
        },
      ],
    });
    res.send({ message: "success", results: results });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

module.exports = app;
