const express = require("express");
const app = express();
const GroupModel = require("../models/GroupModel");


app.get("/group/list", async (req, res) => {
  try {
    const results = await GroupModel.findAll();
    res.send({ results: results });
  } catch (e) {
    res.send({ message: e.message });
  }
});

// app.post("/prefix/addprefix", async (req, res) => {
//   try {
//     const result = await PrefixModel.create(req.body);
//     if (!result) {
//       return res.status(400).send({ message: "ข้อมูลไม่ถูกต้อง" });
//     }
//     res.status(201).send({ message: "success", result: result });
//     //res.send({ message: 'success', result: result });
//     //console.log("result:", result)
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send({ message: "เกิดข้อผิดพลาด", error: e.message });
//   }
// });

module.exports = app;
