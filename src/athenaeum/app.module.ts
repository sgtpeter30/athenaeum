import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from 'src/shared/services/user-based/auth-interceptor.service';
import { MenuComponent } from "./menu/menu.component";

export const environment = {
  apiUrl: "http://localhost:3200"
};

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: "BASE_API_URL", useValue: environment.apiUrl },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MenuComponent
    ]
})
export class AppModule { }
