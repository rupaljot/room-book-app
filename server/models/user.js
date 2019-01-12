const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Seats = mongoose.Schema ({
  roomId: {
    type: Number,
    required: true
  },
  seatsBooked: {
    type: Number,
    required:true
  }
});

// User Schema
const UserSchema = mongoose.Schema ({
  username: {
    type: String,
    required: true
  },
  noOfSeatsBooked: {
    type: [Seats]
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(user, callback) {
  const query = {
    $and: [
      {username: user.username}, {password: user.password}
   ]
  }
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  newUser.save(callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
