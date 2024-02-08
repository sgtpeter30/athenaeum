import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent, LiveFormComponent, LiveFormModel, PasswordValidator, UserService, LiveFormBuilder } from '@lib/shared';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    LiveFormComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  showRegisterLoader: boolean = false;

  lfb: LiveFormBuilder = new LiveFormBuilder()
  registerLiveForm!: LiveFormModel
  @ViewChild('registerForm') registerForm!: any

  constructor(
    private userService: UserService,
  ){}

  ngOnInit(): void {
    this.registerLiveForm = {
      name: 'registerForm',
      group: {
        email: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Adres e-mail',
          validators: [Validators.required, Validators.email]
        }),
        login: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Login',
          validators: [Validators.required, Validators.minLength(4)]
        }),
        password: this.lfb.controls({
          component: InputFieldComponent,
          inputType: 'password',
          label: 'Hasło',
          validators: [Validators.required, Validators.minLength(8)]
        }),
        repeatPassword: this.lfb.controls({
          component: InputFieldComponent,
          inputType: 'password',
          label: 'Powtórz hasło',
          validators: [Validators.required, Validators.minLength(8), PasswordValidator('password')]
        })
      }
    }
  }

  protected async registerUser(){
    this.showRegisterLoader = true;
    const formValue = this.registerForm.getValueIfValid()
    if(formValue){
      await this.userService.createUser(formValue)
      this.showRegisterLoader = false;
    }else{
      this.showRegisterLoader = false;
    }
  }

}
