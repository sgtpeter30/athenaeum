const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require("../models/user");
const router = express.Router();
const authData = require("../auth");

router.post("/signup", (req, res, next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=>{
      const user = new User({
        login: req.body.login,
        password: hash,
      });
      user.save()
        .then(result =>{
          res.status(201).json({
            message: 'User created!',
            result: result
          })
        })
        .catch(err =>{
          res.status(500).json({
            error: err
          })
        })
    })
});
router.post("/signin", (req, res, next)=>{
  User.findOne({ login: req.body.login })
    .then(user =>{
      if(!user){
        return res.status(401).json({
          message: "Błędne dane"
        });
      }
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result =>{
      if(!result){
        return res.status(401).json({
          message: "Błędne dane"
        });
      }
      const token = jwt.sign(
        {
          login: user.login,
          userId: user._id
        },
        authData.secString,
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: "Błędne dane"
      });
    })
});

module.exports = router;
