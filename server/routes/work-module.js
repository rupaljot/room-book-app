const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


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
router.get('/userData', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  User.getUserBookedRooms(req.user, (err, user) => {

    if(err){
      res.json({failure:'Error in data querying'});
    }
    if(user){
      let resUser = new User({
        username: user.username,
        noOfSeatsBooked: user.noOfSeatsBooked,
        password: null
      })
      res.json(resUser);
    }
  })
  
});

module.exports = router;
