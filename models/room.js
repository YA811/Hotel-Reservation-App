const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
price:{
    type: Number,
    required: true,
  },
  availability:{
    type: Boolean,
  },
  Reserved:{
    type: Boolean,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room