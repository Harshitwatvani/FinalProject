import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private cookieSer: CookieService) {}
  canActivate(): boolean {
    if(this.cookieSer.get('UserID') == ""){
        this.router.navigate(['/search']);
        return false;
    }
    return true;
  }
}