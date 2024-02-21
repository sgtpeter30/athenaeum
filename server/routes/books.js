const express = require("express");
const Book = require('../models/bookMongoose');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('',(req, res, next) =>{
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    decription: req.body.decription
  });
  console.log(book);
  book.save();
  res.status(201).json({
    message: "Book added!"
  });
});

router.get('',checkAuth, (req, res, next) => {
  Book.find().then(documents => {
    console.log('status: 200')
    res.status(200).json(documents)
  })
});
router.get('/:id', checkAuth ,(req, res, next) => {
  console.log(req.params.id);
  Book.findById(req.params.id).then(book => {
    if(book){
      console.log(book)
      res.status(200).json(book)
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
});
router.get('author/:name', checkAuth,(req, res, next) => {
  console.log(req.params.id); q
  Book.find({author: req.params.id}).then(book => {
    if(book){
      console.log(book)
      res.status(200).json(book)
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
});

router.delete("/:id", checkAuth, (req, res, next)=>{
  console.log(req.params.id);
  Book.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message: "Book deleted!"});
  })
})

module.exports = router;
