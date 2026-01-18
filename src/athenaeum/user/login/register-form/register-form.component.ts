import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { form, minLength, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CreatingUser, UserService } from '@lib/shared';
import { InputFieldComponent, LiveFormBuilder, LiveFormComponent, LiveFormModel, PasswordField, PasswordMissmatchValidator } from '@props-and-tinkering/pt-core';



@Component({
  selector: 'app-register-form',
  imports: [
    MatButtonModule,
    MatInputModule,
    LiveFormComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  userService = inject(UserService);

  showRegisterLoader: boolean = false;

  lfb = new LiveFormBuilder()
  registerFormHTML: LiveFormModel<CreatingUser> = {
    name: 'registerForm',
    controls: {
      // email: this.lfb.controls({
      //   component: InputFieldComponent,
      //   label: 'Adres e-mail',
      //   validators: [Validators.required, Validators.email]
      // }),
      login: this.lfb.controls({
        component: InputFieldComponent,
        label: 'Login',
        validators: [Validators.required, Validators.minLength(4)]
      }),
      password: this.lfb.controls({
        component: PasswordField,
        label: 'Hasło',
        validators: [Validators.required, Validators.minLength(4)]
      }),
      repeatPassword: this.lfb.controls({
        component: PasswordField,
        label: 'Powtórz hasło',
      })
    }
  }
  registerSignal = signal<CreatingUser>({
    login: "",
    password: "",
    repeatPassword: ""
  })
  registerForm = form(this.registerSignal, (rootPath) => {
    required(rootPath.login)
    required(rootPath.password)
    required(rootPath.repeatPassword)
    minLength(rootPath.login, 4)
    minLength(rootPath.password, 4)
    minLength(rootPath.repeatPassword, 4)
    PasswordMissmatchValidator
  })

  constructor(
    // private userService: UserService,
  ) { }

  protected async registerUser() {
    this.showRegisterLoader = true;
    if (!this.registerForm().invalid()) {
      await this.userService.createUser(this.registerForm().value())
      this.showRegisterLoader = false;
    } else {
      this.showRegisterLoader = false;
    }
  }

}
