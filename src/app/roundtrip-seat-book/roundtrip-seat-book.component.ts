import { Component, OnInit } from '@angular/core';
import { SeatSelectServices } from '../Services/SeatsSelectService';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { AirportSearchService } from '../services/airport.Search';
import { PassengerService } from '../services/PassengerService';

@Component({
  selector: 'app-roundtrip-seat-book',
  templateUrl: './roundtrip-seat-book.component.html',
  styleUrls: ['./roundtrip-seat-book.component.css']
})

export class RoundtripSeatBookComponent implements OnInit {
  prefixClass = {}
  seatObject = {};
  info:any = {};
  rows;
  columns;
  totalFare = 0;
  selectedSeats = {};
  seatCount = 0;
  count;

  seatObject1 = {};
  info1:any = {};
  rows1;
  columns1;
  selectedSeats1 = {};
  seatCount1 = 0;
  count1;
  totalFare1 = 0;
  available: boolean;
  ticket1:string = "t1";
  ticket2:string = "t2";
  overallFare = 0;
  
  constructor(public seatSer: AirportSearchService, private http: HttpClient, private router: Router, private passengerSer: PassengerService) {
    
    if(this.seatSer.book.TripID == null || this.seatSer.book.Airplane_no == null || this.seatSer.book.TripID_round == null || this.seatSer.book.Airplane_no_round == null){
      alert('Select Flight First')
      this.router.navigate(['/display-flights'])
      return
    }

    this.prefixClass = {
      B : "BusinessClassFair",
      E : "EconomyClassFair",
      F : "FirstClassFair"
    }
    this.available = false;
    this.seatSer.getTickets().subscribe((data)=>{
      this.ticket1 = data[0].TicketID;
      this.ticket2 = data[1].TicketID;
    })

    this.count = this.seatSer.book.Passenger;

    this.info = {};
    if(this.seatSer.book.Airplane_no && this.seatSer.book.TripID ){
      
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

                console.log(this.info.passengerSeats)
                for(var pSeat of this.info.passengerSeats){
                  this.seatObject[pSeat].booked = true
                }
              })
            });
          });
      });
    }

    this.count1 = this.seatSer.book.Passenger;

    this.info1 = {};

    if(this.seatSer.book.Airplane_no_round && this.seatSer.book.TripID_round ){
      this.http.get('http://localhost:57445/api/Plane/' + this.seatSer.book.Airplane_no_round).subscribe(data => {
          // console.log(data)
          this.info1.airplaneInfo = data;
          this.http.get('http://localhost:57445/api/Seat/' + this.seatSer.book.Airplane_no_round).subscribe(data => {
            this.info1.Seats = data;
            this.http.get('http://localhost:57445/api/Passengers/' + this.seatSer.book.TripID_round).subscribe(data => {
              this.info1.passengerSeats = data;
              this.http.get('http://localhost:57445/api/SeatPrice/' + this.seatSer.book.TripID_round).subscribe(data => {
                this.info1.SeatPrice = data;
                this.rows1 = new Array(Math.ceil(this.info1.airplaneInfo.Capacity / this.info1.airplaneInfo.Column_no));
                this.columns1 = new Array(this.info1.airplaneInfo.Column_no);
                // console.log(this.info1)
                for(let i = 0; i < this.rows1.length; i++){
                  this.rows1[i] = i + 1;
                }

                for(let j = 0; j< this.columns1.length; j++){ 
                  this.columns1[j] = String.fromCharCode(65 + j);
                }

                for(let i = 0; i < this.info1.Seats.length; i++){
                  this.seatObject1[this.info1.Seats[i].SeatID] = {
                    type : this.info1.Seats[i].SeatType,
                    price : this.info1.SeatPrice[this.prefixClass[this.info1.Seats[i].SeatType]]
                  }
                }

                for(var pSeat of this.info1.passengerSeats){
                  this.seatObject1[pSeat].booked = true
                }
                this.available = true;
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

    this.seatCount = Object.keys(this.selectedSeats).length;


    // debugger
    // this.selectedSeats[id] =  Number(s.price)

    var x  = 0;
    this.overallFare -= this.totalFare;
    this.totalFare = 0;
    for(var item of Object.keys(this.selectedSeats)){
      x =  x + this.selectedSeats[item];
    }

    this.totalFare = x;
    this.overallFare += x;
  }

  handleSeatClick1(s, id: string){
    if(s.clicked){
      s.clicked = false
      this.seatCount1 -= 1;
    }
    else{
      if(this.seatCount1 == this.count1){
        alert("Max Seat Selected")
        return
      }
      s.clicked = true
    }


    if(this.selectedSeats1[id]){
      delete this.selectedSeats1[id]
    }
    else{
      this.selectedSeats1[id] = Number(s.price)
    }

    this.seatCount1 = Object.keys(this.selectedSeats1).length;


    // debugger
    // this.selectedSeats[id] =  Number(s.price)

    var x  = 0;
    this.overallFare -= this.totalFare1
    this.totalFare1 = 0;
    for(var item of Object.keys(this.selectedSeats1)){
      x =  x + this.selectedSeats1[item];
    }

    this.totalFare1 = x;
    this.overallFare += x;
  }

  onClick(){
    this.router.navigate(['/search'])
  }

  onContinue(){
    var x = [];
    var y: any = {};
    var x1 = [];
    var y1:any = {};
    
    for(var item of Object.keys(this.selectedSeats)){
      y.SeatID = item;
      y.ticketID = this.ticket1
      x.push(y)
      y = {}
    }

    for(var item of Object.keys(this.selectedSeats1)){
      y1.SeatID = item;
      y1.ticketID = this.ticket2
      x.push(y1)
      y1 = {}
    }

    this.passengerSer.seatTicketDetails = x;
    console.log(this.passengerSer.seatTicketDetails)
    this.router.navigate(['/passenger-details'])
    this.passengerSer.totalAmount = Number(this.overallFare);
  }
}
