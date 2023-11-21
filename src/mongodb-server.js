require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const conn_str = process.env.DB_CONNECTION_STRING;

// CONNECT TO MONGODB SERVER
mongoose.connect(conn_str, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// db 연결 여부 체크
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
});

// const corsOption = {
//     origin : "http://localhost:3000"
// };

// // Set CORS option
// app.use(cors(corsOption));

// app.get("/", (req, res) => {
//     res.json({message : `Server is running on port ${port}`});
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
