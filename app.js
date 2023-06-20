const path = require("path");

const express = require("express");
require("dotenv").config();

const { loadPlanets } = require("./Models/convertToJSON");
const { convertToCSV } = require("./Models/convertToCSV")

const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

app.post("/api/getCSV", uploads.single("planets"), async (req, res) => {
  console.log(req.file);
  res.send("Successful");
});

app.post("/api/uploadJSON", (req, res) => {
    loadPlanets().then(() => {
        res.send('CSV data is converted to JSON and stored in database');
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/api/downloadCSV", async (req, res) => {
  await convertToCSV()
  res.send('Convertion to CSV is successfull')
})

module.exports = app;
