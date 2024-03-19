const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
const conn = require("./connect");


app.get("/testConnect", async(req,res)=>{
    try {
        await conn.authenticate()
        res.send("Connection has been Successfully")
    } catch (error) {
        res.send("Unable to connect to the database",error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port `, port);
});