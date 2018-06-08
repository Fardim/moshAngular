import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private authService : AuthService, private router : Router) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isLoggedIn())
      return true;
    this.router.navigate(['/login'], {queryParams : {returnUrl : state.url}});
    return false;
  }
}
