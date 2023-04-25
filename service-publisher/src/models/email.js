const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String, default: uuid },
    sent_to: { type: String, required: true },
    mail_body: { type: String, required: true },
    sent_date:{type: Date, required: true}
});

module.exports = mongoose.model('email', schema);