const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = new Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  date: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
});

const restaurantSchema = new Schema({
  Location: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Details: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  Comments: [comment],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
