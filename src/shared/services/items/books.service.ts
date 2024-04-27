import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toObservable } from '@angular/core/rxjs-interop';
import { Book } from '@lib/shared';
import { isEmpty } from 'lodash';
import { Observable, distinctUntilChanged, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookList = signal<Book[]>([])
  bookList$ = toObservable(this.bookList)

  private book = signal<Book | {}>({})
  book$ = toObservable(this.book)

  private externalBookList = signal<Book[] | []>([])
  externalBookList$ = toObservable(this.externalBookList)

  urls = {
    list: 'api/books',
    getByISBN: 'api/getByISBN'
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  getBooksFromServer() {
    lastValueFrom(this.http.get<Book[]>(this.urls.list))
      .then((list) => {
        return this.updateBooksList(list)
      })
      .catch(err => {
        this.snackBar.open(err.error.message, undefined, {
          duration: 2000,
          panelClass: 'error-snack',
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      })
  }

  updateBooksList(booksList: Book[]) {
    this.bookList.update(() => booksList)
  }

  getCurrentBooksList(): Book[] {
    return this.bookList()
  }

  getBooksList(): Observable<Book[]> {
    return this.bookList$
  }


  searchByISBN(isbn: string) {
    return lastValueFrom(this.http.get<Book[]>(`${this.urls.getByISBN}/${isbn}`))
      .then((response: Book[]) => {
        this.externalBookList.update(() => response)
        return response
      })
  }

  getExternalBooks() {
    return this.externalBookList$.pipe(
      map((bookList: Book[]) => bookList),
      distinctUntilChanged()
    )
  }

  addBookData(book: Book) {
    this.book.update(() => {
      return book
    })
  }

  getCurrentBook() {
    return this.book$
      .pipe(
        map((book) => {
          return book
        }),
        distinctUntilChanged()
      )
  }
}

