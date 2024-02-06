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

  cacheList(bookList: Book[]){
    sessionStorage.setItem('bookList', JSON.stringify(bookList))
  }
  
  getCachedList(){
    const bookListString = sessionStorage.getItem('bookList')
    let bookList: Book[] = []
    if(bookListString){
      bookList = JSON.parse(bookListString);
      this.bookList.update(()=>bookList);
    }else{
      // todo check if nessessery? (for now only if session doesn't expire)
      this.getBooksFromServer()
    }
    return bookList
  }

  updateBooksList(booksList: Book[]){
    this.cacheList(booksList)
    this.bookList.update(()=> booksList)
  }

  getCurrentBooksList(): Book[] {
    if(isEmpty(this.bookList())){
      return this.getCachedList()
    }
    return this.bookList()
  }

  getBooksList(): Observable<Book[]> {
    if(isEmpty(this.bookList())){
      this.getCachedList()
    }
    return this.bookList$
  }
}

