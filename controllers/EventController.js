const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require('./Service')
const EventModel = require("../models/EventModel");


app.get('/event/list', Service.isLogin, async (req, res) => {
  try {
      const results = await EventModel.findAll({
          // where: {
          //     userId: Service.getMemberId(req)
          // },
         // attributes: ['id', 'level', 'lname', 'usr'],
          order: [['id', 'DESC']]
      });
      res.send({ message: 'success', results: results });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})
app.post('/event/insert', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await EventModel.create(payload);
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.delete('/event/delete/:id', Service.isLogin, async (req, res) => {
  try {
      await EventModel.destroy({
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
app.post('/event/edit', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await EventModel.update(payload, {
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
