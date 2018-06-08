import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .pipe(map(response => {
      //console.log(response.json());
      let result = response.json();
      if(result && result.token){
        localStorage.setItem('token',result.token);
        return true;
      }
      return false;
    }));
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    let jwtHelperService = new JwtHelperService()
    const token : string = localStorage.getItem('token');
    if(!token)
      return false;
    //console.log(token);
    let IsExpired = jwtHelperService.isTokenExpired(token);
    let ExpirationDate = jwtHelperService.getTokenExpirationDate(token);
    console.log('IsExpired', IsExpired);
    return IsExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token)
      return null;
    
    let jwtHelper = new JwtHelperService();
    let body = jwtHelper.decodeToken(token);
    //console.log(body);
    return body;
  }
}

