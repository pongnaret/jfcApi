const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require('./Service')
const PrefixModel = require("../models/PrefixModel");


app.get('/prefix/list', Service.isLogin, async (req, res) => {
  try {
      const results = await PrefixModel.findAll({
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
app.post('/prefix/insert', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await PrefixModel.create(payload);
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.delete('/prefix/delete/:id', Service.isLogin, async (req, res) => {
  try {
      await PrefixModel.destroy({
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
app.post('/prefix/edit', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await PrefixModel.update(payload, {
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
