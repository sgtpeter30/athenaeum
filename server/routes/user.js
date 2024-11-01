const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const authData = require("../auth");

router.post("/signup", (req, res, next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=>{
      console.log(req.body.login)
      const user = new User({
        login: req.body.login,
        password: hash,
      });
      user.save()
        .then(result =>{
          console.log(result)
          res.status(201).json({
            message: 'User created!',
            result: result
          })
        })
        .catch(err =>{
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
    })
});
router.post("/signin", (req, res, next) => {
  User.findOne({ login: req.body.login })
      .then(user => {
          console.log(user)
      if (!user) {
          return res.status(401).json({
              message: "Błędne dane"
          });
      }
      const comparison = bcrypt.compare(req.body.password, user.password);
      if (comparison) {
          const token = jwt.sign({
              login: User.login,
              userId: User._id
          }, authData.secString, { expiresIn: '1h' });
          return res.status(200).json({
              token: token
          });
      }
      else {
          return res.status(401).json({
              message: "Błędne dane"
          });
      }
  })
      .catch(err => {
      return res.status(401).json({
          message: "Błędne dane"
      });
  });
});

module.exports = router;
