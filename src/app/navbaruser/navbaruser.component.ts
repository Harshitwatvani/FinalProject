import { Component, OnInit } from '@angular/core';
import { navService } from '../services/navService';
import { AirportSearchService } from '../services/airport.Search';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent implements OnInit {

  constructor(private nav:navService,private airSer:AirportSearchService, private cookieSer: CookieService) { }

  logout(){
    this.nav.navAdmin=false;
    this.nav.navHome=true;
    this.nav.navUser=false;
    this.airSer.uid=undefined;
    this.cookieSer.deleteAll()
    }

  ngOnInit(): void {
  }

}
