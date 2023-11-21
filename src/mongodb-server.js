const express = require("express");
const cors = require("cors");

const app = express();
const corsOption = {
    origin : "http://localhost:3000"
};

const PORT = process.env.PORT || 8080;

// Set CORS option
app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.json({message : `Server is running on port ${PORT}`});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})