import { Component, OnInit, Signal, ViewChild, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Validators } from '@angular/forms';
import { InputFieldComponent, LiveFormComponent, UserService, LiveFormBuilder, LiveFormModel, User } from '@lib/shared';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-form',
    standalone: true,
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss',
    imports: [
      CommonModule,
      MatButtonModule,
      MatInputModule,
      LiveFormComponent
    ]
})
export class LoginFormComponent implements OnInit {
  showLoginLoader: boolean = false

  lfb: LiveFormBuilder = new LiveFormBuilder()
  loginLiveForm!: LiveFormModel
  @ViewChild('loginForm') loginForm!: LiveFormComponent

  constructor(
    private userService : UserService,
  ){}

  ngOnInit(): void {
    this.loginLiveForm = {
      name: 'loginForm',
      group: {
        login: this.lfb.controls({
          label: 'Login',
          component: InputFieldComponent,
          validators: [Validators.required]
        }),
        password: this.lfb.controls({
          label: 'Hasło',
          component: InputFieldComponent,
          inputType: 'password',
          validators: [Validators.required]
        })
      },
    }
  }

  protected async loginUser(){
    this.showLoginLoader = true;
    const formValue = this.loginForm.getValueIfValid();
    if(formValue){
      await this.userService.loginUser(formValue as User);
      this.showLoginLoader = false;
    }else{
      this.showLoginLoader = false;
    }
  }
}
