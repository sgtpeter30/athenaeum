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

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    private router: Router,
  ){}
  goToList(){
    this.router.navigate(["/books"]);
  }
  addNew(){
    this.router.navigate(["/book"]);
  }
  goUser(){
    this.router.navigate(["/books"]);
  }
}
