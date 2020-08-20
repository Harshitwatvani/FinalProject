import { Component } from '@angular/core';
import { AirportSearchService } from './services/airport.Search';
import { UserService } from './services/UserService';
import { navService } from './services/navService';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public navSer: navService, public cookieSer: CookieService){

  }
  title = 'AirplaneReservationSite';
}
