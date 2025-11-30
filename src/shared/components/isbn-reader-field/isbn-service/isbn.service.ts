import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { isEmpty } from "lodash";
import { lastValueFrom, map, distinctUntilChanged } from "rxjs";
import { Book, ExternalBook } from "src/shared/models";


@Injectable({
  providedIn: 'root'
})
export class ISBNService {

  private http = inject(HttpClient);
  url = 'api/books/';

  public externalBookList = signal<ExternalBook[] | []>([])
  externalBookList$ = toObservable(this.externalBookList)

  private externalBook = signal<ExternalBook | null>(null);


  async searchByISBN(isbn: string) {
    const response = await lastValueFrom(this.http.get<ExternalBook[]>(`${this.url}getByISBN?isbn=${isbn}`));
    this.externalBookList.update(() => response);
    return response;
  }

  getExternalBookList() {
    return this.externalBookList$.pipe(
      map((bookList: ExternalBook[]) => bookList),
      distinctUntilChanged()
    )
  }

  updateExternalBookList(list: ExternalBook[]){
    this.externalBookList.update(()=> list);
  }


  getBookDataFromExternalBook(): Book{
    const externalBook = this.externalBook()
    if(!externalBook ){
      throw new Error("Wrong data type")
    }
    const { selected, source, ...book } = externalBook;
    return book
  }
}