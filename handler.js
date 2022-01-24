const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const listController = require("./controller/listcontroller");
const app = express();
const router = require("./route");
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(router);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});
app.get("/api", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/getAllItems", (req, res, next) => {
  listController.getAllItems(req.body, (results) => {
    
    res.json({ results: results });
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
//module.exports = app;
