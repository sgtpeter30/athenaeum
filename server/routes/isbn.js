const express = require("express");
const https = require('https');
const checkAuth = require('../middleware/check-auth');
const authData = require('../auth')

const router = express.Router();

const getOutsideRequest = (server)=>{
  return new Promise((resolve, reject) => {
    server.on('response', (response) => {
      let data = '';
      response.on('data', (chunk) => {
          data += chunk;
      });
      response.setHeader('Connection', 'close')
      response.on('end', () => {
        console.log('end?')
        resolve(JSON.parse(data));
      });
  });
  server.on('error', reject);
  server.end();
  })
}

router.get('/:isbn', checkAuth, (req, res, next) => {
  console.log(req.params);
  console.log(req.params.isbn);
  const isbn = req.params.isbn
  // const isbn = '9788379648672'

  const bnServer = new URL(`https://data.bn.org.pl/api/bibs.json?isbnIssn=${isbn}`);
  const bnRequest = https.request(bnServer)
  const openLibrary = new URL(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
  const openLibraryRequest = https.request(openLibrary)
  const isbnPlus = new URL(`https://api-2445581351187.apicast.io:443/search?q=business&p=1&app_id=${authData.isbnPlusId}&app_key=${authData.isbnPlusKey}&${isbn}`)
  const isbnPlusRequest = https.request(isbnPlus)
  
  const googleBooks = new URL(`https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}&projection=full&key=${authData.googleApiKey}`)
  const googleBooksRequest = https.request(googleBooks)
  
  // const request = https.request(dataServerUrl, (response) => {
  //   let data = '';
  //   response.on('data', (chunk) => {
  //       data += chunk;
  //   });
  //   response.on('end', () => {
  //       res.json(JSON.parse(data));
  //   });
  // });

  // // Obsługa błędów
  // request.on('error', (error) => {
  //   res.status(500).json({ error: 'Wystąpił błąd podczas próby połączenia z serwerem data.bn.org.pl' });
  // });

  // // Wykonanie zapytania
  // request.end();

  Promise.all([
    // getOutsideRequest(bnRequest),
    // getOutsideRequest(openLibraryRequest),
    // getOutsideRequest(isbnPlusRequest)
    getOutsideRequest(googleBooksRequest)
  ]).then((responses) => {
    console.log('responses')
    // Zwrócenie odpowiedzi z obu serwerów jako odpowiedź na początkowe żądanie GET
    res.json(responses);
  }).catch((error) => {
      // Obsługa błędów
      res.status(500).json({ error: 'Wystąpił błąd podczas próby połączenia z serwerami' });
  });
});

const bnMap = (data)=>{
  return data
}

module.exports = router;