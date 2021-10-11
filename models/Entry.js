const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

module.exports = Entry = mongoose.model('entry', EntrySchema);
