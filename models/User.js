const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  can_3_room: {
    type: Boolean,
    default: false,
  },
  can_4_room: {
    type: Boolean,
    default: false,
  },
  can_farming_page: {
    type: Boolean,
    default: false,
  },
  can_farming_detail: {
    type: Boolean,
    default: false,
  },
  can_farming_multi: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'users' // Specify the desired collection name
});

const User = mongoose.model('User', userSchema);

module.exports = User;
