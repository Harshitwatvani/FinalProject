import { Component, OnInit } from '@angular/core';
import { navService } from '../services/navService';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navbaradmin',
  templateUrl: './navbaradmin.component.html',
  styleUrls: ['./navbaradmin.component.css']
})
export class NavbaradminComponent implements OnInit {

  constructor(private nav:navService, private cookieSer: CookieService) { }

  logout(){
    this.nav.navAdmin=false;
    this.nav.navHome=true;
    this.nav.navUser=false;
    this.cookieSer.deleteAll()
  }
  
  ngOnInit(): void {
  }

}
