import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AirportSearchService } from '../services/airport.Search';
import { PassengerService } from '../services/PassengerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-book',
  templateUrl: './seat-book.component.html',
  styleUrls: ['./seat-book.component.css']
})

export class SeatBookComponent implements OnInit {

  prefixClass = {}
  seatObject = {};
  info:any = {};
  rows;
  columns;
  
  totalFare: Number;
  selectedSeats = {};
  seatCount = 0;
  count;
  ticketID:string;

  constructor(public seatSer:AirportSearchService ,private router: Router, private http: HttpClient, private passengerSer: PassengerService) {
    // console.log("qwert");

    // debugger
    if(this.seatSer.book.TripID == null || this.seatSer.book.Airplane_no == null){
      alert('Select Flight First')
      this.router.navigate(['/search'])
      return
    }

    this.prefixClass = {
      B : "BusinessClassFair",
      E : "EconomyClassFair",
      F : "FirstClassFair"
    }
    this.seatSer.getTickets().subscribe((data)=>{
      this.ticketID = data[0].TicketID;
      // console.log(this.ticketID);
    })

    this.count = this.seatSer.book.Passenger;

    this.info = {};
    // console.log(this.count);
    if(this.seatSer.book.Airplane_no && this.seatSer.book.TripID && this.seatSer.bid){
      // console.log(this.seatSer.book);
      this.http.get('http://localhost:57445/api/Plane/' + this.seatSer.book.Airplane_no).subscribe(data => {
          this.info.airplaneInfo = data
          this.http.get('http://localhost:57445/api/Seat/' + this.seatSer.book.Airplane_no).subscribe(data => {
            this.info.Seats = data;
            this.http.get('http://localhost:57445/api/Passengers/' + this.seatSer.book.TripID).subscribe(data => {
              this.info.passengerSeats = data;
              this.http.get('http://localhost:57445/api/SeatPrice/' + this.seatSer.book.TripID).subscribe(data => {
                this.info.SeatPrice = data;
                this.rows = new Array(Math.ceil(this.info.airplaneInfo.Capacity / this.info.airplaneInfo.Column_no));
                this.columns = new Array(this.info.airplaneInfo.Column_no);

                for(let i = 0; i < this.rows.length; i++){
                  this.rows[i] = i + 1;
                }

                for(let j = 0; j< this.columns.length; j++){ 
                  this.columns[j] = String.fromCharCode(65 + j); 
                }

                for(let i = 0; i < this.info.Seats.length; i++){
                  this.seatObject[this.info.Seats[i].SeatID] = {
                    type : this.info.Seats[i].SeatType,
                    price : this.info.SeatPrice[this.prefixClass[this.info.Seats[i].SeatType]]
                  }
                }

                for(var pSeat of this.info.passengerSeats){
                  this.seatObject[pSeat].booked = true
                }
              })
            });
          });
      });
    }
  }

  ngOnInit(): void {
  }

  handleSeatClick(s, id: string){
    if(s.clicked){
      s.clicked = false
      this.seatCount -= 1;
    }
    else{
      if(this.seatCount == this.count){
        alert("Max Seat Selected")
        return
      }
      s.clicked = true
    }

    if(this.selectedSeats[id]){
      delete this.selectedSeats[id]
    }
    else{
      this.selectedSeats[id] = Number(s.price)
    }

    // console.log(this.selectedSeats)

    this.seatCount = Object.keys(this.selectedSeats).length;


    // debugger
    // this.selectedSeats[id] =  Number(s.price)

    var x : Number = 0;
    this.totalFare = 0;

    // console.log(this.selectedSeats)

    for(var item of Object.keys(this.selectedSeats)){
      x =  x + this.selectedSeats[item];
    }

    this.totalFare = x
  }

  onContinue(){
    var x = [];
    var y: any = {};
    for(var item of Object.keys(this.selectedSeats)){
      // console.log(item, 'sanvlakvnlav')
      y.SeatID = item;
      y.ticketID = this.ticketID
      y.price = this.selectedSeats[item]
      x.push(y)
      y = {} 
    }
    this.passengerSer.seatTicketDetails = x;
    console.log(this.passengerSer.seatTicketDetails)
    this.router.navigate(['/passenger-details'])
    this.passengerSer.totalAmount = 0;
    this.passengerSer.totalAmount = Number(this.totalFare)
  }
}
