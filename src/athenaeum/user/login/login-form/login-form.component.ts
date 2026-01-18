import { Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Validators } from '@angular/forms';
import { InputFieldComponent, LiveFormBuilder, LiveFormModel, LiveFormComponent, PasswordField, TextField } from '@props-and-tinkering/pt-core';
// import { InputFieldComponent, LiveFormBuilder, LiveFormModel, LiveFormComponent } from '@props-and-tinkering/pt-core';
import { TranslatePipe } from 'src/shared/pipes';
import { User, UserService } from '@lib/shared';
import { form, required } from '@angular/forms/signals';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  imports: [
    MatButtonModule,
    MatInputModule,
    LiveFormComponent,
    TranslatePipe
  ]
})
export class LoginFormComponent {
  showLoginLoader: boolean = false
  userService = inject(UserService)

  lfb = new LiveFormBuilder()
  loginFormHTML: LiveFormModel<User> = {
    name: 'loginForm',
    controls: {
      login: this.lfb.controls({
        label: 'username',
        component: TextField,
        autocomplete: "login"
      }),
      password: this.lfb.controls({
        label: 'Hasło',
        component: PasswordField,
        autocomplete: "current-password"
      })
    },
  }
  loginSignal = signal<User>({
    login: "",
    password: ""
  })
  loginForm = form(this.loginSignal, (rootPath) => {
    required(rootPath.login)
    required(rootPath.password)
  })


  protected async loginUser() {
    this.showLoginLoader = true;
    if (!this.loginForm().invalid()) {
      await this.userService.loginUser(this.loginForm().value());
      this.showLoginLoader = false;
    } else {
      this.showLoginLoader = false;
    }
  }
}
