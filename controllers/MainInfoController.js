const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require('./Service')
const MainInfoModel = require("../models/MainInfoModel");


app.get('/maininfo/list', Service.isLogin, async (req, res) => {
  try {
      const results = await MainInfoModel.findAll({
          // where: {
          //     userId: Service.getMemberId(req)
          // },
         // attributes: ['id', 'level', 'lname', 'usr'],
          order: [['id', 'ASC']]
      });
      res.send({ message: 'success', results: results });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})
app.post('/maininfo/insert', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await MainInfoModel.create(payload);
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.delete('/maininfo/delete/:id', Service.isLogin, async (req, res) => {
  try {
      await MainInfoModel.destroy({
          where: {
              id: req.params.id
          }
      });
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})
app.post('/maininfo/edit', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await MainInfoModel.update(payload, {
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

module.exports = app;
