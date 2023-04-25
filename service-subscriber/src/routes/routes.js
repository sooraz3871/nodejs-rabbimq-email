"use strict";

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger/logger");


//Health-Check of the Publisher
router.get("/health-check", (req, res) => {
  try {
    const healthcheck = {
      uptime: process.uptime(),
      message: "Subscriber-OK",
      timestamp: Date.now(),
    };
    res.status(200).send(healthcheck);
  } catch (err) {
    console.error("\x1b[43m\x1b[1m%s\x1b[0m", err);
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(500).send("Server Error");
  }
});

module.exports = router;