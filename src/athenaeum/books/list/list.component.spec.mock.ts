import { Observable } from "rxjs/internal/Observable";
import { Book } from "@lib/shared"
import { toObservable } from "@angular/core/rxjs-interop";
import { signal } from "@angular/core";
import { delay, of } from "rxjs";

export const bookList: Partial<Book>[] = [
  {
    "type": [],
    "favourite": false,
    "read": false,
    "wishlist": false,
    "myTag": [],
    "_id": "1",
    "title": "Pan lodowego ogrodu tom 1",
    "author": "Jarosław Grzędowicz",
  },
  {
    "type": [],
    "favourite": false,
    "read": false,
    "wishlist": false,
    "myTag": [],
    "_id": "2",
    "title": "Siewca Wiatru",
    "author": "Maja lidia Kossakowska",
  },
  {
    "type": [],
    "favourite": false,
    "read": false,
    "wishlist": false,
    "myTag": [],
    "_id": "3",
    "title": "Pan lodowego ogrodu tom 2",
    "author": "Jarosław Grzędowicz",
  }
]

export class ListComponentMock {
  static getBooksList = (): Observable<Partial<Book>[]>=>{
    return of(bookList).pipe(delay(100))
  }
}
