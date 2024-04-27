const mongoose = require('mongoose');
const Book = require('./book')
const bookSchema = mongoose.Schema(Book);
module.exports = mongoose.model('Book', bookSchema);
