import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  currentUser: any; 

  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
   return this.http.post('/api/token', credentials)
    .map(response => {
      let result = response.json();
      
      if (result && result.token) {
        localStorage.setItem('token', result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true; 
      } else {
         return false; 
      }
    }).catch(response => {
      console.log('error was catched');
      return Observable.of(false);
    });
  }

  logout() { 
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() { 
    return tokenNotExpired('token');
  }
}

