const express = require("express");
const https = require('https');
const checkAuth = require('../middleware/check-auth');
const authData = require('../auth')
const bookServices = require('../middleware/book-services')

const router = express.Router();

router.get('/:isbn', checkAuth, async (req, res, next) => {
  console.log(req.params);
  console.log(req.params.isbn);
  const isbn = req.params.isbn
  // const isbn = '9788379648672'

  try {
    const booksArray = await bookServices(isbn)
    
    //   {
    //     "title": "Czarne miecze",
    //     "author": "Arkady Saulski",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "undefined undefined"

    //   },
    //   {
    //     "title": "Czarne miecze",
    //     "author": "Arkady Saulski",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "undefined undefined"
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     title: "tytuł",
    //   author: "autor",
    //   comment: "komentarz",
    //   cover: "okładka",
    //   decription: "opis",
    //   dimensions: "wymiary",
    //   edition: "edycja",
    //   favourite: "ulubiona",
    //   ilustrations: "ilustracje",
    //   orgLang: "język orginału",
    //   pages: "ilość stron",
    //   price: "cena",
    //   priceOrg: "cena oryginalna",
    //   publisher: "wydawca",
    //   series: "seria",
    //   size: "rozmiar",
    //   translation: "tłumaczenie",
    //   type: "typ",
    //   volume: "tom",
    //   read: "przeczytana",
    //   myTag: "moje tagi",
    //   orgTitle: "tytuł oryginalny",
    //   mode: "",
    //   rating: "ocena",
    //   wishlist: "lista życzeń",
    //   },
    //   {
    //     "title": "Czarne miecze",
    //     "author": "Arkady Saulski",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "undefined undefined"
    //   },
    //   {
    //     "title": "Czarne miecze",
    //     "author": "Arkady Saulski",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "undefined undefined"
    //   },
    //   {
    //     "title": "Czarne miecze",
    //     "author": "Arkady Saulski",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "undefined undefined"
    //   },
    //   {
    //     "title": "Czarne mieczyki",
    //     "author": "Saulski Arkady 2",
    //     "orgLang": "pl",
    //     "pages": 0,
    //     "price": "210 zł",
    //     "series": "some series",
    //   }
    // ]
    // console.log(booksArray);
    // setTimeout(()=>{
    // }, 1000)
    // console.log("booksArray");
    res.json(booksArray);
 } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Wystąpił błąd podczas próby połączenia z serwerami' });
 }
  
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
  
  // Promise.all([
  //   // getOutsideRequest(bnRequest),
  //   // getOutsideRequest(openLibraryRequest),
  //   // getOutsideRequest(isbnPlusRequest)
  //   // getOutsideRequest(googleBooksRequest)
  // ]).then((responses) => {
  //   console.log('responses')
  //   // Zwrócenie odpowiedzi z obu serwerów jako odpowiedź na początkowe żądanie GET
  //   res.json(responses);
  // }).catch((error) => {
  //     // Obsługa błędów
  //     res.status(500).json({ error: 'Wystąpił błąd podczas próby połączenia z serwerami' });
  // });
});

module.exports = router;