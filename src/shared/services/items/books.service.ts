import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toObservable } from '@angular/core/rxjs-interop';
import { Book } from '@lib/shared';
import { isEmpty } from 'lodash';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookList = signal<Book[]>([])
  bookList$ = toObservable(this.bookList)
  
  url: string = 'api/books';

  constructor(
    private http: HttpClient,
    private snackBar : MatSnackBar,
  ) { }

  getBooksFromServer(){
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

  updateBooksList(booksList: Book[]){
    this.bookList.update(()=> booksList)
  }

  getCurrentBooksList(): Book[] {
    return this.bookList()
  }

  getBooksList(): Observable<Book[]> {
    return this.bookList$
  }
}

