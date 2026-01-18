import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreatingUser, User } from '../../models/user.model';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from '../items/books.service';

export interface Token {
  accessToken: string | null,
  refreshToken: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token!: Token | null

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private booksService: BooksService,
  ) { }
  url: string = "api/auth";

  setToken(token: Token | null){
    this.token = token;
    if(token !== null){
      this.cacheToken(token);
    }else{
      this.cacheToken({
        accessToken: "",
        refreshToken: ""
      });
    }
  }

  getToken(): Token | null {
    if (!this.token) {
      this.token = this.getCacheToken()
    }
    return this.token.accessToken !== "" ? this.token : null;
  };

  getCacheToken(): Token {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("goodCookie="))
      ?.split("=")[1];
    return cookieValue && cookieValue != 'undefined' ? JSON.parse(cookieValue) : {
      accessToken: "",
      refreshToken: ""
    }
  }

  cacheToken(token: Token) {
    // sessionStorage.setItem('token', token)
    const expireDate = (new Date(Date.now() + 3600 * 1000)).toUTCString();
    // document.cookie = `goodCookie=${JSON.stringify(token)};expires=${expireDate};path=/;secure;Strict;`
    document.cookie = `goodCookie=${JSON.stringify(token)};expires=${expireDate};Strict;`
  }

  createUser(data: CreatingUser) {
    const authData: User = {
      login: data.login,
      password: data.password
    }
    return lastValueFrom(this.http.post<any>(this.url + '/signup', authData))
      .then(response => {
        this.snackBar.open(response.message, undefined, {
          duration: 2000,
          panelClass: 'success-snack',
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      })
      .catch(err => {
        this.snackBar.open(err.error.message, undefined, {
          duration: 2000,
          panelClass: 'error-snack',
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        console.log(err)
        return err
      })
  };

  async loginUser(authData: User) {
    // return this.http.post<User[]>(this.url+'/signin', authData);
    try {
      const response = await lastValueFrom(this.http.post<Token>(this.url + '/signin', authData));
      const token = response;
      this.setToken(token)
      this.booksService.getBooksFromServer();
      this.router.navigate(["/books"]);
      return response;
    } catch (err: any) {
      this.snackBar.open(err.error.message, undefined, {
        duration: 2000,
        panelClass: 'error-snack',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      console.log(err);
      return err;
    }
  }

  async logout() {
    const response = await lastValueFrom(this.http.post<{ token: string; }>(this.url + '/signout', this.getToken()));
    this.setToken(null)
    this.router.navigate(["/"]);
    return response
  }

  /** WYWOŁYWANE TYLKO PRZEZ INTERCEPTOR */
  refreshTokenRequest() {
    if (!this.token?.refreshToken || this.token?.refreshToken === "") return of(null);

    return this.http
      .post(this.url+'/refresh', { refreshToken: this.token.refreshToken })
      .pipe(
        tap((res: any) => {
          this.setToken(res)
        }),
        catchError(() => {
          this.logout()
          return of(null)
        })
      );
  }
}
