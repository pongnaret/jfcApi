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



app.get('/approve/list', Service.isLogin, async (req, res) => {
  try {
    // การเชื่อมโยง ChangEventUserModel กับ EventModel
    ChangEventUserModel.belongsTo(EventModel)
    ChangEventUserModel.belongsTo(EventUserModel)

    // ค้นหาข้อมูลที่มีการเชื่อมโยงด้วย alias
    const results = await ChangEventUserModel.findAll({
      where: {
        approve: 9
    },
      include: [
        // เรียกข้อมูลจาก EventModel ด้วย alias ที่ไม่ได้ระบุชื่อ (default)
        { model: EventModel },
        { model: EventUserModel, attributes: ['id','changID'] },

      ]
    });

    // ส่งผลลัพธ์กลับไปยัง client
    res.send({ message: 'success', results: results });
  } catch (e) {
    // หากเกิดข้อผิดพลาด ส่งข้อความผิดพลาดกลับไปยัง client
    res.statusCode = 500;
    res.send({ message: e.message });
  }
})

app.get('/approve/successlist', Service.isLogin, async (req, res) => {
  try {
    // การเชื่อมโยง ChangEventUserModel กับ EventModel
    ChangEventUserModel.belongsTo(EventModel)
    ChangEventUserModel.belongsTo(EventUserModel)

    // ค้นหาข้อมูลที่มีการเชื่อมโยงด้วย alias
    const results = await ChangEventUserModel.findAll({
      where: {
              approve: 1
          },
      include: [
        // เรียกข้อมูลจาก EventModel ด้วย alias ที่ไม่ได้ระบุชื่อ (default)
        { model: EventModel, attributes: ['id', 'name'] },
        { model: EventUserModel, attributes: ['id'] },

      ]
    });

    // ส่งผลลัพธ์กลับไปยัง client
    res.send({ message: 'success', results: results });
  } catch (e) {
    // หากเกิดข้อผิดพลาด ส่งข้อความผิดพลาดกลับไปยัง client
    res.statusCode = 500;
    res.send({ message: e.message });
  }
})

app.post('/approve/edit', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await ChangEventUserModel.update(payload, {
          where: {
              id: req.body.id
          }
      })
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.post('/eventuser/update', async (req, res) => {
  try {
    // รับข้อมูลจาก body ของ request
    const payload = req.body;

    // ดำเนินการอัปเดตข้อมูลในฐานข้อมูล
    await EventUserModel.update(payload, {
      where: {
        changID: req.body.changID
      }
    });

    // ส่งข้อความแสดงว่าการอัปเดตเสร็จสมบูรณ์กลับไปยัง client
    res.send({ message: 'success' });
  } catch (e) {
    // หากมีข้อผิดพลาดขณะดำเนินการ ส่งข้อความผิดพลาดกลับไปยัง client
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});




module.exports = app;
