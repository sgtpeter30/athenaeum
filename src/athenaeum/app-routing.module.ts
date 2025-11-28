import { Component, NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ListComponent } from './books/list/list.component';
import { BooksService, PermissionsService, userLogged, userLoggedOut } from '@lib/shared';
import { BookComponent } from './books/book/book.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    // canActivate: [userLoggedOut]
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'books', 
    component: ListComponent,
    canActivate: [userLogged],
  },
  { 
    path: 'book', 
    component: BookComponent, 
    canActivate: [userLogged],
  },
  { 
    path: 'user', 
    component: UserPageComponent, 
    canActivate: [userLogged],
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    PermissionsService, 
    BooksService,
  ]
})
export class AppRoutingModule { }
