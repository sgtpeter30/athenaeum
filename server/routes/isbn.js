const express = require("express");
const https = require('https'); 
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('', checkAuth, (req, res, next) => {
  console.log(req.params);
  // console.log(Book);
  // Book.find().then(documents => {
  //   console.log('status: 200')
  //   res.status(200).json(documents)
  // })
  const isbn = '9788379648672'
  let response
  return https.get(`https://data.bn.org.pl/api/bibs.json?isbnIssn=${isbn}`, response => {
    console.log(response);
    response.on('end', () => { 
      // Parse and work with the received data 
      const jsonData = JSON.parse(data); 
      console.log(jsonData); 
      return res.status(200).json({
        name: 'hello',
        response: JSON.stringify(response),
      })
  }); 
    
    
  })
});

module.exports = router;