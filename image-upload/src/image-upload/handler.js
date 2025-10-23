const express = require("express");
const serverless = require("serverless-http");
const { generateUploadURL } = require("./controller");

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
    return res.json({
        message: "pong",
    });
});

app.get("/generate-upload-url", generateUploadURL);

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

exports.handler = serverless(app);