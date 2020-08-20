import { Component, OnInit } from '@angular/core';
import {PrintticketService} from '../services/printticketService';
import { AirportSearchService } from '../services/airport.Search';


@Component({
  selector: 'app-printticket',
  templateUrl: './printticket.component.html',
  styleUrls: ['./printticket.component.css']
})
export class PrintticketComponent implements OnInit {

  tickets;
  id: string;
  constructor(private printticketService:PrintticketService,private airSer:AirportSearchService) {
    // console.log(this.id);
    this.id=this.airSer.bid;
    console.log(this.id);
    this.printticketService.getTicket(this.id).subscribe((data)=>{
      this.tickets= data;
    })
   }

  ngOnInit(): void {
  }

}
