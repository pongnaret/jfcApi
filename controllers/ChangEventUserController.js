const express = require("express");
const { Op } = require("sequelize");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require('./Service')
const UserModel = require("../models/UserModel");
const EventModel = require("../models/EventModel");
const PositionModel = require("../models/PositionModel");
const EventUserModel = require("../models/EventUserModel")
const ChangEventUserModel = require("../models/ChangEventUserModel")



app.get('/changeventuser/list', Service.isLogin, async (req, res) => {
  try {
      EventUserModel.belongsTo(EventModel)
      EventUserModel.belongsTo(UserModel)
      let payload = req.body;
        payload.userId = Service.getMemberId(req);

      const results = await EventUserModel.findAll({
      //const results = await UserModel.findAll({
          where: {
              userId: Service.getMemberId(req),
              status: {
                [Op.or]: [1, 2]
            }
          },
      });
      res.send({ message: 'success', results: results });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.post('/changeventuser/insert', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await ChangEventUserModel.create(payload);
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.get('/changeventuser/latest', Service.isLogin, async (req, res) => {
  try {
    let payload = req.body;
    payload.userId = Service.getMemberId(req);

    const latestChangId = await ChangEventUserModel.findOne({
      order: [['id', 'DESC']],
      attributes: ['id']

    });
    if (!latestChangId) {
      return res.status(404).json({ message: 'No changId found' });
    }
    res.status(200).json({ message: 'success', results: latestChangId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});







module.exports = app;
