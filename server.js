const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn = require("./connect");
const { use } = require("./controllers/PrefixController");

app.get("/testConnect", async(req,res)=>{
    try {
        await conn.authenticate()
        res.send("Connection has been Successfully")
    } catch (error) {
        res.send("Unable to connect to the database",error)
    }
})

app.use(require("./controllers/PrefixController"));
app.use(require("./controllers/GroupController"))
app.use(require("./controllers/PositionController"))
app.use(require("./controllers/UserController"))
app.use(require("./controllers/MemberController"))
app.use(require("./controllers/EventController"))
app.use(require("./controllers/EventUserController"))
app.use(require("./controllers/ChangEventUserController"))
app.use(require("./controllers/ApproveController"))
app.use(require("./controllers/ReportController"))
app.use(require("./controllers/MainInfoController"))
//app.use(require("./controllers/lineNotifyController"))

// const { fetchDataAndSendLineNotification } = require("./controllers/lineNotifyController"); // Import ฟังก์ชัน sendLineNotification

// const { fetchDataAndSendLineNotification } = require("./controllers/lineNotifyController"); // Import ฟังก์ชัน sendLineNotification
//     fetchDataAndSendLineNotification();

const scheduledHour = 7;
const scheduledMinute = 0;

scheduleJob();

function scheduleJob() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();



  // ถ้าเวลาปัจจุบันเป็นเวลาที่เราต้องการให้ฟังก์ชันทำงาน
  if (currentHour === scheduledHour && currentMinute === scheduledMinute) {
    // เรียกใช้งานฟังก์ชันที่ต้องการให้โปรแกรมทำงาน
    const { fetchDataAndSendLineNotification } = require("./controllers/lineNotifyController"); // Import ฟังก์ชัน sendLineNotification
    fetchDataAndSendLineNotification();
  }


  // ตรวจสอบทุก 1 นาที
  setTimeout(scheduleJob, 60000)
}

// fetchDataAndSendLineNotification();


app.listen(port, () => {
    console.log(`Example app listening on port `, port);
});

