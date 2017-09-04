import { AdminAuthGuard } from './common/admin-auth-guard.service';
import { AuthGuard } from './common/auth-guard.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpModule, Http } from '@angular/http';
import { HomeComponent } from './home/home.component';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
