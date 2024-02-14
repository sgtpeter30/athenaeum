import { Observable } from "rxjs/internal/Observable";
import { Book } from "@lib/shared"



export class ListComponentMock {
  static bookService = {
    // bookList = bookList
    // bookList$
    // getBooksList: Observable.of
    // getBooksList: (): Observable<Book[]>=> {
    //   return bookList
    // },
    // getCachedList: ()=> {
      // return bookList
    // }
  }

  static bookList = [
    {
      "type": [],
      "favourite": false,
      "read": false,
      "wishlist": false,
      "myTag": [],
      "_id": "6295fcd4a056680a78decc54",
      "title": "Pan lodowego ogrodu tom 1",
      "author": "Jarosław Grzędowicz",
      "__v": 0
    },
    {
      "type": [],
      "favourite": false,
      "read": false,
      "wishlist": false,
      "myTag": [],
      "_id": "6296090ffedb21782772cdec",
      "title": "Siewca Wiatru",
      "author": "Maja lidia Kossakowska",
      "__v": 0
    },
    {
      "type": [],
      "favourite": false,
      "read": false,
      "wishlist": false,
      "myTag": [],
      "_id": "6295fe6a452fb90838e224e2",
      "title": "Pan lodowego ogrodu tom 2",
      "author": "Jarosław Grzędowicz",
      "__v": 0
    }
  ]
}