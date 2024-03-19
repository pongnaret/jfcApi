const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const service = require("./Service");
const UserModel = require("../models/UserModel");


app.post('/member/signin', async (req, res) => {
  try {
      const user = await UserModel.findAll({
        where: {
          username: req.body.username,
          password: req.body.password,
        }
      });
      if (user.length > 0) {
        let token = jwt.sign({ id: user[0].id }, process.env.secret);
        res.send({ token: token, message: "success" });
      } else {
        res.statusCode = 401;
        res.send({ message: "not found" });
      }      
  } catch (e) {
      res.statusCode = 500;
      res.send({ message: e.message });
  }
});

app.get('/member/info',service.isLogin, async (req, res) => {
  try {
   // MemberModel.belongsTo(PackageModel);
    const payLoad = jwt.decode(service.getToken(req));
    const user = await UserModel.findByPk(payLoad.id, {
      attributes: ['id', 'fname'],
      // include:[
      //   {
      //     model:PackageModel,
      //     attributes: ['name']
      //   }
      // ]
      
    });
    res.send({ result: user, message: "success" });
  } catch (e) {
    res.statusCode = 500;
    return res.send({ message: e.message });
  }
});

app.put("/member/changeProfile", service.isLogin, async (req, res) => {
  try {
    const memberId = service.getMemberId(req);
    const payload = {
      name: req.body.memberName,
    };
    const result = await UserModel.update(payload, {
      where: {
        id: memberId,
      },
    });

    res.send({ message: "success", result: result });
  } catch (e) {
    res.statusCode = 500;
    return res.send({ message: e.message });
  }
});


module.exports = app;