"use strict";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());

const router = require('./src/routes/routes');

dotenv.config();

const { SERVER_PORT: port } = process.env;

app.use(
  cors({
    credentials: false,
    methods: ["GET","POST"],
    origin: ["http://localhost"],
  })
);

app.use('/v1/api',router);

//Catch UncaughtException
process.on("uncaughtException", function (err) {
  console.log(err);
});


app.listen(port, () => {
  console.log(`producer listening to port ${port}`);
});