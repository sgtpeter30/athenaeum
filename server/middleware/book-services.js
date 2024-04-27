const express = require("express");
const https = require('https');
const authData = require('../auth')
const mapBook = require('./map-book')



const chooseBookMapper = (service, book) => {
  console.log("chooseBookMapper")
  console.log(service)
  
  switch(service){
    case "googleBooks": {
      if(book.totalItems != 0){
        return mapBook.google(book.items[0]);
      }else{
        return
      }
    }
    case "bnServer": {
      return book;
    }
    default: {
      return 
    }
  }
}

const getOutsideRequest = async (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

bookServices = async (isbn) => {
  serviceArray = [
    // {
    //   serviceName: "bnServer",
    //   url: `https://data.bn.org.pl/api/bibs.json?isbnIssn=${isbn}`,
    // },
    {
      serviceName: "googleBooks",
      url: `https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}&projection=full&key=${authData.googleApiKey}`,
    },
  ];
  console.log("hello here book Services")
  const bookArray = [];
  for (const service of serviceArray) {
    const book = await getOutsideRequest(service.url)
    const mappedValue = chooseBookMapper(service.serviceName ,book)
    if(mappedValue){
      bookArray.push(mappedValue)
    }
  }
  return bookArray
};

//  {
//   bnServer: `https://data.bn.org.pl/api/bibs.json?isbnIssn=${isbn}`,
//   openLibrary: `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`,
//   isbnPlus: `https://api-2445581351187.apicast.io:443/search?q=business&p=1&app_id=${authData.isbnPlusId}&app_key=${authData.isbnPlusKey}&${isbn}`,
//   googleBooks: `https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}&projection=full&key=${authData.googleApiKey}`,
//   // bnRequest: https.request(bnServer)
//   // openLibraryRequest: https.request(openLibrary)
//   // isbnPlusRequest: https.request(isbnPlus)
//   // const googleBooksRequest = https.request(googleBooks)
// }

module.exports = bookServices;
