const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Room Schema
const RoomSchema = mongoose.Schema ({
  roomId: {
    type: String
  },
  imageId: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  }
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getRooms = function(room, callback) {
  query = { 'availableSeats' :{
    $gte : room.availableSeats
  }};
  Room.find(query, callback);
}

module.exports.updateRoom = function(room, callback) {
  query = {
    roomId : room.roomId
  }
  Room.find(query, (err, originalroom)=>{
    if(originalroom.length==1){
      originalroom[0].availableSeats = originalroom[0].availableSeats - room.availableSeats;
      
      if(originalroom[0].availableSeats >= 0){
        originalroom[0].save(callback);
      }else{
        throw err
      }
    }
  })
}


// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }
