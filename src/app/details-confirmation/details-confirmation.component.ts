import { Component, OnInit } from '@angular/core';
import { DetailConfirmationService } from '../services/detailConfirmationService';
import { DetailConfirmation } from '../models/DetailConfirmationModel';
import { AirportSearchService } from '../services/airport.Search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-confirmation',
  templateUrl: './details-confirmation.component.html',
  styleUrls: ['./details-confirmation.component.css']
})
export class DetailsConfirmationComponent implements OnInit {
passenger:DetailConfirmation;
passengers;
id:string;
index:number;
  constructor(private details:DetailConfirmationService,private router:Router,private airportSer:AirportSearchService) { 
    this.id=this.airportSer.bid;
    this.index=0;
    this.passenger=new DetailConfirmation();
    this.details.getDetails(this.id).subscribe((data)=>{
      console.log(data);
      this.passengers=data;
    })
    // this.passenger=this.passengers[this.index];

    
  }
proceed(){
  
  this.router.navigate(["/payment"]);
}
  ngOnInit(): void {
  }

}
