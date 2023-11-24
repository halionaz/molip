// 이거 오늘 안에 어떻게든 구현하고 잔다 - '23.11.21

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 8080;
const conn_str = process.env.DB_CONNECTION_STRING;

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOption = {
    origin: "http://localhost:3000",
};

// Set CORS option
app.use(cors(corsOption));

// CONNECT TO MONGODB SERVER
mongoose
    .connect(conn_str, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("🎉 Success MongoDB Connect");
    })
    .catch((err) => {
        console.error(err);
    });

const db = mongoose.connection;

// db 연결 여부 체크
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
});

// 게시물 스키마 정의
const pageSchema = new mongoose.Schema({
    type: String,
    emoji: String,
    title: String,
    content: String,
    parent_ID: {
        type: ObjectId,
        ref: "Page"
    },
});

// 게시물 모델 생성
const PAGES_DB = mongoose.model("Page", pageSchema);

// GET /pages
// 전체 페이지 조회
app.get("/pages", async (req, res) => {
    try {
        // pages 컬렉션 모두 가져오기
        // 빠른 전송을 위해 각 페이지의 content는 생략
        const pages = await PAGES_DB.find().select("_id type emoji title");
        res.json(pages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET /pages/:pid
// 특정 페이지 조회
app.get("/pages/:pid", async (req, res) => {
    try {
        const result = await PAGES_DB.find({ _id: req.params.pid });
        res.json(result);
    } catch (err) {
        console.log(`없는 페이지 접속, 리다이렉트`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /pages
// 페이지 추가
app.post("/pages", async (req, res) => {
    try {
        // PAGES_DB 컬렉션에 데이터를 insert
        const page = await PAGES_DB.create({
            type: req.body.type,
            emoji: req.body.emoji, // 페이지 타이틀 이모지
            title: req.body.title,
            content: req.body.content,
        });
        res.status(201).json(page);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT /pages/:pid
// 페이지 수정
app.put("/pages/:pid", async (req, res) => {
    try {
        const result = await PAGES_DB.findOneAndUpdate(
            {
                _id: req.params.pid,
            },
            {
                emoji: req.body.emoji,
                title: req.body.title,
                content: req.body.content,
            }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /pages/:pid
// 페이지 삭제
app.delete("/pages/:pid", async (req, res) => {
    try {
        const result = await PAGES_DB.deleteOne({
            _id: req.params.pid,
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
