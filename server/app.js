const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const isbnRoutes = require("./routes/isbn");
const authData = require("./auth");

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(authData.mongooseAdress)
  .then(()=>{
    console.log('Connected to database!');
  })
  .catch(()=>{
    console.log('Connection failed!');
  });

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use("/api/books", booksRoutes);
app.use("/api/user", userRoutes);
app.use("/api/getByISBN", isbnRoutes);

module.exports = app;
