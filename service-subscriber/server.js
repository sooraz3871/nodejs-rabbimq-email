"use strict";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(express.json());

const router = require('./src/routes/routes');
const { subscribe } = require("./src/routes/subscriber/subscriber");

dotenv.config();

const { SERVER_PORT: port } = process.env;

app.use(
  cors({
    credentials: false,
    methods: ["GET"],
    origin: ["http://localhost"],
  })
);

app.use('/v1/api',router);

setInterval(() => {
  subscribe();
}, 3000);



//Catch UncaughtException
process.on("uncaughtException", function (err) {
  console.log(err);
});


app.listen(port, () => {
  console.log(`Subscriber listening to port ${port}`);
});