import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toObservable } from '@angular/core/rxjs-interop';
import { Book, emptyBook, ExternalBook } from '@lib/shared';
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

  url = 'api/books/';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  getBooksFromServer() {
    // todo add authorization
    lastValueFrom(this.http.get<Book[]>(this.url))
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

  getCurrentBook(): Book {
    if(isEmpty(this.book())){
      console.warn("Book doesn't exists!")
      return {...emptyBook, isbn: 9788367949422}
    }
    return this.book() as Book
    // return this.book$
    //   .pipe(
    //     map((book) => {
    //       return book
    //     }),
    //     distinctUntilChanged()
    //   )
  }

  updateCurrentBook(book: Book) {
    this.book.update(() => {
      return book
    })
  }

  addNewBook(){
    console.log(this.book)
    // this.http.post<Book>(`${this.url}addBookToList`, this.book)
  }
}

