import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ListComponent } from './books/list/list.component';
import { PermissionsService, userLogged } from '@lib/shared';
import { BooksService } from 'src/shared/services/items/books.service';
import { BookComponent } from './books/book/book.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionsService, BooksService]
})
export class AppRoutingModule { }
