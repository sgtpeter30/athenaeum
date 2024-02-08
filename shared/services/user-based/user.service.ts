import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { BooksService } from '../items/books.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token!: string | null;
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private snackBar: MatSnackBar,
    private booksService : BooksService,
  ) {}
  url : string = "api/user";

  getToken(): string | null{
    if(!this.token){
      this.token = this.getCacheToken()
    }
    return this.token;
  };
  
  getCacheToken(): string | null{
    const sessionToken = sessionStorage.getItem('token');
    return sessionToken ? sessionToken : null
  }

  cacheToken(token: string){
    sessionStorage.setItem('token', token)
  }

  createUser(data: any){
    const authData: User = {
      login: data.login,
      password: data.password
    }
    return lastValueFrom(this.http.post<any>(this.url+'/signup', authData))
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

  loginLocalUser(){}

  loginUser(authData: User){
    // return this.http.post<User[]>(this.url+'/signin', authData);
    return lastValueFrom(this.http.post<{token: string}>(this.url+'/signin', authData))
    .then(response =>{
      const token = response.token;      
      this.token = token;
      this.cacheToken(token)
      // this.getToken()
      this.booksService.getBooksFromServer()
      this.router.navigate(["/books"]);
      return response
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
  }
}
