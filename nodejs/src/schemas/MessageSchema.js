const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  users: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FinalTaskMessages', MessageSchema);
