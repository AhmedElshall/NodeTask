const mongoose = require('mongoose');


const statusSchema = new mongoose.Schema({
  status: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]

});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
