"use strict";

// const {channel:ch }= require('../helpers/rabbitmq.helper');
const ampqplib = require("amqplib");
const { saveUserToDB } = require("../../methods/insert_email.method");
const { sendEmail } = require("../../service/email/email.service");
const logger = require("../../utils/logger/logger");

exports.subscribe = async () => {
  const { AMQP_URL: amqp_url, AMQP_QUEUE: queue } = process.env;
  try {
    const conn = await ampqplib.connect(amqp_url, "heartbeat=60");
    
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, { durable: true });
    await ch.consume(
      queue,
      async function (data) {
        if (data === null) {
          return;
        }
        const emailData = data?.content?.toString();
        await sendEmail(emailData,ch);
        await saveUserToDB(JSON.parse(emailData));
        ch.ack(data);
      },
      { consumerTag: "myconsumer" }
    );
  } catch (error) {
    // ch.nack(data, false, true);
    // logger.info("error");
    console.error("\x1b[43m\x1b[1m%s\x1b[0m", "Establishing Connection to RabbitMQ");
    // throw error;
  }
};
