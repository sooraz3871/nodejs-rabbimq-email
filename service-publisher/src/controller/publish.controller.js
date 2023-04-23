"use strict";

const ampqplib = require("amqplib");
const logger = require("../utils/logger/logger");


const publishToQue = async (request) => {

  const {
    AMQP_URL: amqp_url,
    AMQP_EXCHANGE: exchange,
    AMQP_QUEUE: queue,
    AMQP_ROUTING_KEY: routingKey,
  } = process.env;
  try {
    const conn = await ampqplib.connect(amqp_url);
    logger.info("Connection Established-RabbitMQ")
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, "direct", { durable: true });
    await ch.assertQueue(queue, { durable: true });
    await ch.bindQueue(queue, exchange, routingKey);
    await ch.publish(exchange, routingKey, Buffer.from(request));
  } catch (error) {
    throw error;
  }
};

module.exports={publishToQue}