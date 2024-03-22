const { Sequelize, Op } = require("sequelize");
const UserModel = require("../models/UserModel");
const EventModel = require("../models/EventModel");
const EventUserModel = require("../models/EventUserModel");
const MainInfoModel = require("../models/MainInfoModel")
const axios = require("axios");
// const LINE_NOTIFY_ACCESS_TOKEN = "your_access_token_here";

// const startDate = new Date(); // วันที่ปัจจุบัน
// const endDate = new Date(startDate); // สร้างวัตถุ Date ใหม่โดยใช้วัตถุ Date ปัจจุบัน
// endDate.setDate(startDate.getDate() + 1); // เพิ่มหนึ่งวันไปยังวันที่ปัจจุบัน

let  message = "";
//currentDate.setUTCHours(0, 0, 0, 0); // เพิ่มหนึ่งวัน
// const currentDate = new Date();
//const formattedDate = currentDate.toISOString().split("T")[0];

async function fetchDataAndSendLineNotification() {
  EventUserModel.belongsTo(EventModel);
  EventUserModel.belongsTo(UserModel);

  try {
    // ดึงข้อมูลจากฐานข้อมูล
    const currentDate = new Date(); // วันที่ปัจจุบัน
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 1); // เพิ่มหนึ่งวัน
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 1); // ลดหนึ่งวัน

    const results = await EventUserModel.findAll({
      where: {
        start: {
          [Op.between]: [startDate, endDate],
        },
        //start: currentDate,
        status: {
          [Op.or]: [1, 2],
        },
      },
      include: [{ model: EventModel }, { model: UserModel }],
    });

    // message = "วันที่ \n"+''+result.start;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    results.forEach((result) => {
      const date = result.start;
      const eventName = result.Event.name;
      const title = result.title;
      const i = result.Event.length;

      
      const formattedDate = date.toLocaleDateString("th-TH", options);
      // for (let i = 0; i < array.length; index++) {
      //   const element = array[index];
        
      // }

      message = "กิจกรรม" + formattedDate + " \n " + eventName + " \n" + title;

      //console.log(message);
      sendLineNotification(message); // ส่งข้อความผ่าน Line Notify
    });

    //console.log(message);
    //sendLineNotification(message); // ส่งข้อความผ่าน Line Notify
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล:", error);
  }
}

async function fetchDataTomorrowAndSendLineNotification() {
  EventUserModel.belongsTo(EventModel);
  EventUserModel.belongsTo(UserModel);

  try {
    // ดึงข้อมูลจากฐานข้อมูล
    const currentDate = new Date(); // วันที่ปัจจุบัน
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 2); // เพิ่ม2วัน
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate()); // 

    const results = await EventUserModel.findAll({
      where: {
        start: {
          [Op.between]: [startDate, endDate],
        },
        //start: currentDate,
        status: {
          [Op.or]: [1, 2],
        },
      },
      include: [{ model: EventModel }, { model: UserModel }],
    });

    // message = "วันที่ \n"+''+result.start;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    results.forEach((result) => {
      const date = result.start;
      const eventName = result.Event.name;
      const title = result.title;
      const i = result.Event.length;

      
      const formattedDate = date.toLocaleDateString("th-TH", options);
      // for (let i = 0; i < array.length; index++) {
      //   const element = array[index];
        
      // }

      message = "กิจกรรม" + formattedDate + " \n " + eventName + " \n" + title;

      //console.log(message);
      sendLineNotification(message); // ส่งข้อความผ่าน Line Notify
    });

    //console.log(message);
    //sendLineNotification(message); // ส่งข้อความผ่าน Line Notify
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล:", error);
  }
}

async function getTokenFromDatabase() {
  try {
    // เรียกใช้งานฟังก์ชันหรือเรียก API เพื่อดึง token จากฐานข้อมูล
    const results = await MainInfoModel.findAll({
      //limit: 1, // กำหนดให้ค้นหาข้อมูลเพียงหนึ่งรายการ
    });
    // ตรวจสอบว่ามีข้อมูลหรือไม่ก่อนที่จะดึงค่า lineToken
    if (results.length > 0) {
      const token = results[0].lineToken; // ดึงค่า lineToken จากข้อมูลแรกในอาร์เรย์
     
      return token;
    } else {
      throw new Error("ไม่พบข้อมูล token ในฐานข้อมูล");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึง token จากฐานข้อมูล:", error);
    throw error;
  }
}

// ส่งข้อมูลผ่าน Line Notify API
async function sendLineNotification(message) {
  try {
    // ดึง token จากฐานข้อมูล
    const token = await getTokenFromDatabase();

    const response = await axios.post(
      "https://notify-api.line.me/api/notify",
      `message=${message}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`, // นำ token ที่ได้มาใช้งานในการส่งข้อมูล
        },
      }
    );
    console.log("ส่งข้อมูลผ่าน Line Notify API สำเร็จ:", response.data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อมูลผ่าน Line Notify API:", error);
  }
}

module.exports = { fetchDataAndSendLineNotification };
