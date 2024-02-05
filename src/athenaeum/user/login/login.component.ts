import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 
import { UserService } from 'src/shared/services/user-based/user.service';
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
      MatExpansionModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      LoginFormComponent,
      RegisterFormComponent
    ]
})
export class LoginComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;  
}
