import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  send: any = {}
  detailsByID: any = {};
  trips: any;
  planes;
  at:boolean=false;
  dt:boolean=false;
  p:boolean=false;
  
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:57445/api/Trips').subscribe(data => {
      this.trips = data
      // console.log(data)
    })
  }

  ngOnInit(): void {
  }

  insertDetailInfo(e){
    // this.selected = e
    this.send.FlightID = e;
  }

  getTripDetail(e){
    this.detailsByID = {}
    this.http.get('http://localhost:57445/api/planes').subscribe(data => {
      this.planes = data;
      this.http.get('http://localhost:57445/api/Trips/' + e).subscribe(data => {
        this.detailsByID = data
        this.send.Arrival_Time = this.detailsByID.Arrival_Time
        this.send.Departure_Time = this.detailsByID.Departure_Time
        this.send.Airplane_No = this.detailsByID.Airplane_No
      })
    })
  }

  insertPlane(e){
    this.send.Airplane_No = e;
  }

  addDept(e){
    this.send.Departure_Time = e;
  }

  addArrivalTime(e){
    this.send.Arrival_Time = e;
  } 

  show(){
    console.log(this.send.Airplane_No)
    if(this.send.Arrival_Time==undefined||this.send.Departure_Time ==undefined||
      this.send.Airplane_No==undefined||this.send.Airplane_No==''){
      if(this.send.Arrival_Time==undefined)
      this.at=true;
      else
      this.at=false;
      if(this.send.Departure_Time==undefined)
      this.dt=true;
      else
      this.dt=false;
      if(this.send.Airplane_No==undefined||this.send.Airplane_No=='')
      this.p=true;
      else
      this.p=false;

    }
    else{
    this.send.TripID = this.detailsByID.TripID;
    this.send.TripDate = this.detailsByID.TripDate;
    this.http.put("http://localhost:57445/api/Trips/1", this.send)
    .subscribe(data => alert("Trip Edited!!!"))
  }
}
}
