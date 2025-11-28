import { Component } from '@angular/core';
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslationService, UserService } from '@lib/shared';
import { TranslatePipe } from 'src/shared/pipes';

@Component({
  selector: 'app-menu',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    TranslatePipe
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    private router: Router,
    public userService: UserService
  ) { }
  goToList() {
    this.router.navigate(["/books"]);
  }
  addNew() {
    this.router.navigate(["/book"]);
  }
  goUser() {
    this.router.navigate(["/user"]);
  }
  logout(){
    this.userService.logout();
  }
}
