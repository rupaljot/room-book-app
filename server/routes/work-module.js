const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Room = require('../models/room');



// Register
router.post('/register', (req, res, next) => {
  
  let newUser = new User ({
    username: req.body.username,
    password: req.body.password,
    noOfSeatsBooked: [
      
    ]
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
  
});

// Authenticate
router.post('/getUser', (req, res, next) => {
  let checkUser = new User({
    username : req.body.username,
    password : req.body.password,
    noOfSeatsBooked : null
  });

  User.getUserByUsername(checkUser.username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(checkUser.password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+ token,
          user: {
            username: user.username,
            password: null,
            noOfSeatsBooked: [
              
            ]
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.post('/getUser', (req, res, next) => {
  let checkUser = new User({
    username : req.body.username,
    password : req.body.password,
    noOfSeatsBooked : null
  });

  User.getUserBookedRooms(checkUser, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }else{
      return res.json(user);
    }
  });
});

// Profile
router.post('/userData', (req, res, next) => {
  let user = new User({
    username : req.body.username
  }) ;
  User.getUserBookedRooms(user, (err, user) => {

    if(err){
      res.json({failure:'Error in data querying'});
    }
    if(user){
      res.json(user);
    }
  })
  
});

router.post('/rooms', (req, res, next) => {4
  let seat = new Room({
    availableSeats : req.body.seatsBooked
  });
  Room.getRooms(seat, (err, room) => {

    if(err){
      res.json([]);
    }
    if(room){
      res.json(room);
    }
  })
  
});

router.post('/book', (req, res, next) => {
  let room = new Room({
    roomId : req.body.roomId,
    availableSeats : req.body.seatsBooked,
    imageId : req.body.imageId
  });

  let user = new User({
    username : req.body.user.username
  })

  let query = {
    roomId: req.body.roomId,
    seatsBooked: req.body.seatsBooked,
    imageId: req.body.imageId,
    availableSeats: req.body.availableSeats,
    dateOfBooking: req.body.dateOfBooking,
    dateForBooking: req.body.dateForBooking
  }


  Room.updateRoom(room, (err, room)=>{
    if(err){
      res.json({success : false})
    }else{
      User.updateUserBooking(user, query, (err, user) =>{
        if(err){
          res.json({success : false});
        }else{
          res.json(user);
        }
      })
    }
  });
});


router.post('/editDetails', (req, res, next) => {
  let room = new Room({
    roomId : req.body.roomId,
    availableSeats : req.body.seatsBooked - req.body.oldSeats,
    imageId : req.body.imageId
  });

  let user = new User({
    username : req.body.user.username
  })

  let query = {
    roomId: req.body.roomId,
    seatsBooked: req.body.seatsBooked,
    imageId: req.body.imageId,
    availableSeats: req.body.availableSeats,
    dateOfBooking: req.body.dateOfBooking,
    dateForBooking: req.body.dateForBooking,
    oldDateForBooking: req.body.oldDateForBooking
  }


  Room.updateRoom(room, (err, room)=>{
    if(err){
      res.json({success : false})
    }else{
      User.editUserBooking(user, query, (err, user) =>{
        if(err){
          res.json({success : false});
        }else{
          res.json(user);
        }
      })
    }
  });
});


module.exports = router;
