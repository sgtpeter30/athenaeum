const express = require("express");
const Book = require('../models/book')
  mapBook = {
    google: (book)=>{
      console.log("google book")
      const mappedBook = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0], //todo dodać obsługę wielu autorów
        // series: ,brak serii?
        // volume: book.volumeInfo.,
        publisher: book.volumeInfo.publisher,
        // edition: Number,
        // translation: String,
        orgLang: book.volumeInfo?.language,
        // orgTitle: String,
        // ilustrations: String,
        // type: [],
        cover: book.volumeInfo?.imageLinks?.medium,
        pages: book.volumeInfo.pageCount,
        dimensions: book.volumeInfo.dimensions,
        // favourite: Boolean,
        // read: Boolean,
        // wishlist: Boolean,
        // priceOrg: String,
        price: `${book.volumeInfo?.saleInfo?.retailPrice?.amount} ${book.volumeInfo?.saleInfo?.retailPrice?.currencyCode}`,
        // rating: Number,
        // myTag: [],
        // decription: String,
        // comment: string
      }
      return mappedBook;
    },
    bnServer: (book)=>{
      const mappedBook = {
        title: book.bibs.title,
        author: "",
        series: "",
        volume: 0,
        publisher: "",
        edition: 0,
        translation: "",
        orgLang: "",
        orgTitle: "",
        ilustrations: "",
        type: [],
        cover: "",
        pages: 0,
        size: "",
        dimensions: {
          height: "",
          width: "",
          thickness: ""
        },
        favourite: true,
        read: true,
        wishlist: true,
        priceOrg: "",
        price: "",
        rating: 0,
        myTag: [],
        decription: "",
        comment: ""
      }
      return mappedBook;
    }
  }
module.exports = mapBook;


const mappedBook = {
  title: "",
  author: "",
  series: "",
  volume: 0,
  publisher: "",
  edition: 0,
  translation: "",
  orgLang: "",
  orgTitle: "",
  ilustrations: "",
  type: [],
  cover: "",
  pages: 0,
  size: "",
  dimensions: {
    height: "",
    width: "",
    thickness: ""
  },
  favourite: true,
  read: true,
  wishlist: true,
  priceOrg: "",
  price: "",
  rating: 0,
  myTag: [],
  decription: "",
  comment: ""
}
