import { Component, OnInit } from '@angular/core';
import { AirportSearchService } from '../services/airport.Search';

@Component({
  selector: 'app-navbarlogin',
  templateUrl: './navbarlogin.component.html',
  styleUrls: ['./navbarlogin.component.css']
})
export class NavbarloginComponent implements OnInit {
  user;
  x;
  constructor(private airportSer: AirportSearchService) {
   }

  ngOnInit(): void {
    // debugger 
  }

  
  loginBy(x){
    this.user = x;    
  }
}
