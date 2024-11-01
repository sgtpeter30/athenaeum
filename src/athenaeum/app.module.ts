import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from 'src/shared/services/user-based/auth-interceptor.service';
import { MenuComponent } from "./menu/menu.component";

export const environment = {
  apiUrl: "http://localhost:3200"
};

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        MenuComponent], providers: [
        { provide: "BASE_API_URL", useValue: environment.apiUrl },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
