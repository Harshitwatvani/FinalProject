import { Component, OnInit } from '@angular/core';
import {ViewbookingService} from '../services/viewbookingService';
import {Passenger} from '../models/passenger';
import { Booking } from '../models/booking';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent implements OnInit {

  b;
  bks: Booking[]; 
  bids: Booking[];
  bookings;
  id;
  constructor(private viewbooking:ViewbookingService) {
    this.b=new Booking();
    this.bids= [];
    this.viewbooking.getBookings(this.id).subscribe((data)=>{
      this.bookings= data;
      this.b=this.bookings[0];
      console.log(data);
      console.log(this.bookings)
      console.log(this.b);
     //  for (let i=0; i<this.bookings.length; i++)
     //  {
     //   //  if (this.bids((b)=>b.BID!=this.bookings[i].Bid))
     //   //  {
     //   //   this.bids.Add
     //   //  }

     //  }
    } 
    )
  
   }
  //  fetchBookings()
  //  {
  //    this.viewbooking.getBookings(this.id).subscribe((data)=>{
  //      this.bookings= data;
  //      this.b=this.bookings[0];
  //      console.log(this.bookings)
  //      console.log(this.b);
  //     //  for (let i=0; i<this.bookings.length; i++)
  //     //  {
  //     //   //  if (this.bids((b)=>b.BID!=this.bookings[i].Bid))
  //     //   //  {
  //     //   //   this.bids.Add
  //     //   //  }

  //     //  }
  //    } 
  //    )
  //  }

  ngOnInit(): void {
  }

}
