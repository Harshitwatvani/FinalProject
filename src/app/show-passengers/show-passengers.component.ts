import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../services/PassengerService';

@Component({
  selector: 'app-show-passengers',
  templateUrl: './show-passengers.component.html',
  styleUrls: ['./show-passengers.component.css']
})
export class ShowPassengersComponent implements OnInit {

  passengers;
  id;
  constructor(private passengerService:PassengerService) {
  
   }
   fetchPassengers()
   {
     this.passengerService.getPassengers(this.id).subscribe((data)=>{
       this.passengers= data;
    } 
    )
   }

  ngOnInit(): void {
  }

}
