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

  User.getUserByUsername(checkUser, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }else{
      return res.json(user);
    }
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
