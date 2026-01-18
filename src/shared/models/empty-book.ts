import { Book } from "./book.model";

export const emptyBook: Book = {
  _id: null,
  author: "",
  isbn: 0,
  mode: 'new',
  title : "",
  series : "",
  volume : 0,
  publisher : "",
  publishedDate : "",
  edition : 0,
  translation : "",
  orgLang : "",
  orgTitle : "",
  ilustrations : "",
  type : [],
  cover : "",
  pages : 0,
  size : "",
  dimensions: {
    height: "",
    width: "",
    thickness: ""
  },
  favourite: false,
  read: false,
  wishlist: false,
  priceOrg: "",
  price: "",
  rating : 0,
  myTag : [],
  decription : "",
  comment: ""
}