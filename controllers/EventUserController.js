const express = require("express");
const app = express();
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Service = require('./Service')
const UserModel = require("../models/UserModel");
const EventModel = require("../models/EventModel");
const PositionModel = require("../models/PositionModel");
const EventUserModel = require("../models/EventUserModel")



app.get('/eventuser/list', Service.isLogin, async (req, res) => {
  try {
      EventUserModel.belongsTo(EventModel)
      EventUserModel.belongsTo(UserModel)

      const results = await EventUserModel.findAll({
      //const results = await UserModel.findAll({
        where: {
            status: {
              [Op.or]: [1, 2]
          }
        },
         // attributes: ['id', 'level', 'lname', 'usr'],
          // order: [['id', 'DESC']],
        //   include:[
        //     {
        //       model: UserModel,
        //       attributes: ["name","id"]
        //     },
        //     {
        //       model: EventModel,
        //       attributes: ["name","id"]
        //     }
        //   ]
      });
      res.send({ message: 'success', results: results });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})
app.post('/eventuser/insert', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      //payload.userId = Service.getMemberId(req);

      await EventUserModel.create(payload);
      res.send({ message: 'success' });
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
})

app.delete('/eventuser/delete/:id', Service.isLogin, async (req, res) => {
  try {
      await EventUserModel.destroy({
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
app.post('/eventuser/edit', Service.isLogin, async (req, res) => {
  try {
      let payload = req.body;
      payload.userId = Service.getMemberId(req);

      await EventUserModel.update(payload, {
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



app.get('/eventuser/userdetail/:id', Service.isLogin, async (req, res) => {
    try {
        let payload = req.body;
        payload.userId = Service.getMemberId(req);

        EventUserModel.belongsTo(EventModel)
        EventUserModel.belongsTo(UserModel)
  
        const results = await EventUserModel.findAll( {
            where: {
                id: req.params.id
            },
            include:[
                {
                  model: UserModel,
                  attributes: ["fname","lname","id"]
                },
                {
                  model: EventModel,
                  attributes: ["name","id","color"]
                }
              ]
        })
        res.send({ message: 'success', results: results });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
  })

  app.delete('/eventuser/delete/:id', Service.isLogin, async (req, res) => {
    try {
        await EventUserModel.destroy({
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


module.exports = app;
