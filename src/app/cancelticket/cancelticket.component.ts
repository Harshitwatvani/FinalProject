import { Component, OnInit } from '@angular/core';
import {PrintticketService} from '../services/printticketService';
import { Ticket } from '../models/ticket';
import { Cancelticket } from "../models/cancelticket"

@Component({
  selector: 'app-cancelticket',
  templateUrl: './cancelticket.component.html',
  styleUrls: ['./cancelticket.component.css']
})
export class CancelticketComponent implements OnInit {

  tickets;
  id;
  b:boolean=false;
  constructor(private printticketService:PrintticketService) {
    console.log('bla2');
    this.printticketService.getCancelTicket(this.id).subscribe((data)=>{
      this.tickets= data;
      console.log(data);
      
    } 
    )
  
   }
  
cancelTicket(b:Cancelticket)
{
  this.printticketService.postCancelTicket(b).subscribe((data)=>{
    console.log(data);
    this.printticketService.getCancelTicket(this.id).subscribe((data)=>{
      this.tickets= data;
      console.log(data);
      
    } 
    )
  
  } 
  )
  
}
  ngOnInit(): void {
  }

}
