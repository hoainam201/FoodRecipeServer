const express = require("express");
const index = express();
const route = require("./routes");
require("dotenv").config();
const port = process.env.PORT || 5000;


const cors = require("cors");


index.use(
    cors({
        origin: (process.env.CLIENT_URL || "").split(","),
    })
); // Use this after the variable declaration
index.use(express.urlencoded({ extended: true }));
index.use(express.json());
route(index);

index.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});
index.listen(port, () => {
    console.log(`server running on port: http://localhost:${port}`);
});