const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Seats = {
  roomId: {
    type: Number,
    required: true
  },
  seatsBooked: {
    type: Number,
    required:true
  },
  dateOfBooking: {
    type: Date
  },
  dateForBooking: {
    type: Date
  },
  imageId: {
    type: String
  }
};

// User Schema
const UserSchema = mongoose.Schema ({
  username: {
    type: String,
    required: true
  },
  noOfSeatsBooked: {
    type: Array()
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

module.exports.getUserBookedRooms = function(user, callback) {
  User.findOne(
      {username: user.username},
   callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.editUserBooking = function(user, query, callback){
  const queryToFindUser = {
    username : user.username
  }
  // User.findOne(queryToFindUser, (err, data)=>{
  //   if(data){
  //     User.findOne({'noOfSeatsBooked.roomId': query.roomID},
    //   User.update({'noOfSeatsBooked.roomId': query.roomID}, {'$set': {
    //     'noOfSeatsBooked.$.dateForBooking': query.dateForBooking,
    //     'noOfSeatsBooked.$.seatsBooked': query.seatsBooked
    // }},
    //     callback
    //   );
    // }
  // })
  User.updateOne({'username' : user.username, 'noOfSeatsBooked.dateForBooking' : query.oldDateForBooking},
    { $set: { "noOfSeatsBooked.$.dateForBooking" : query.dateForBooking, "noOfSeatsBooked.$.seatsBooked" : query.seatsBooked} }, callback
  )
  
}

module.exports.updateUserBooking = function(user, query, callback){
  const queryToFindUser = {
    username : user.username
  }
  User.findOne(queryToFindUser, (err, data)=>{
    if(data){
      User.findByIdAndUpdate(data._id,
        {
          "$push": { "noOfSeatsBooked": query }
        },
        { "new": true, "upsert": true },
        callback
      );
    }
  })
  
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

