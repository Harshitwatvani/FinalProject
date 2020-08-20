import { Component, OnInit } from '@angular/core';
import { Flight } from '../models/Flight';
import { FlightService } from '../services/FlightService';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
flight:Flight;
flights;
  constructor(private service:FlightService) {
    this.flights=[];
    this.flight=new Flight();
    this.service.getFlight().subscribe((data)=>{
      this.flights=data;
      console.log(this.flights);
    })
   }
   
   status(flight:Flight){
     if(flight.FlightStatus=="Active")
     {
       flight.FlightStatus="InActive";
     }
     else
     flight.FlightStatus="Active";
    this.service.EditFlight(flight.FlightId,flight).subscribe((data)=>{
      console.log(data);
    })
   }
  ngOnInit(): void {
  }

}
