import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class updateAuth implements CanActivate {
  constructor(private router: Router, private cookieSer: CookieService) {}
  canActivate(): boolean {
    if(this.cookieSer.get('update') === "1"){
        return true;
    }
    else{
        this.router.navigate(['/Login'])
    }
  }
}