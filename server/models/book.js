const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  title : {type: String, require: true},
  author : String,
  series : String,
  volume : Number,
  publisher : String,
  edition : Number,
  isbn : Number,
  translation : String,
  orgLang : String,
  orgTitle : String,
  ilustrations : String,
  type : Array,
  cover : String,
  pages : Number,
  size : String,
  favourite: {type: Boolean, default: 0},
  read: {type: Boolean, default: 0},
  wishlist: {type: Boolean, default: 0},
  priceOrg: String,
  price: String,
  rating : Number,
  myTag : Array,
  decription : String,
});
module.exports = mongoose.model('Book', bookSchema);
