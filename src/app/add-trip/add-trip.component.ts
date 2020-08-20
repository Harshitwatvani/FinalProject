import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  send:any = {};
  flights:any = {};
  planes;
  p:boolean=false;
  d:boolean=false;
  dt:boolean=false;
  at:boolean=false;
  selected = '';
  data;
  prevDate;
  setDate: ''

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:57445/api/Flights').subscribe(data => {
      // this.flights = data
      this.data = data
      // console.log(data)
      this.prevDate = new Date().toISOString().split('T')[0]
      for(let i = 0; i < Object.keys(data).length; i++){
        this.flights[data[i].FlightId] = {}
        this.flights[data[i].FlightId].from = data[i].DeparturePoint;
        this.flights[data[i].FlightId].to = data[i].ArrivalPoint;
        this.flights[data[i].FlightId].TravelDays = data[i].TravelDays
      }
    })


    this.http.get('http://localhost:57445/api/planes').subscribe(data => {
      this.planes = data;
    })
  
   }

  ngOnInit(): void {
  }

  dateClass = (d: Date): boolean => {
    // var day = d.getDay();
    if(this.data === undefined){
      return true
    }
    var arr = new Array(7).fill('1')
    for(var item of this.data){
      if(item.FlightId == this.send.FlightID){
        arr = item.TravelDays.split('');
      }
    }
    let x = arr[arr.length - 1]
    arr.pop();
    arr.unshift(x)
    const day = d.getDay();

    if(arr[day] === '1' && new Date(d).getTime() >= Date.now()){
      return true
    }
    return false
  }

  insertDetailInfo(e){
    this.selected = e
    this.send.FlightID = e;
    this.send.e = ""
    this.setDate = ""
    this.send.TripDate = undefined
  }

  insertPlane(e){
    if(e=='')
    this.p=true;
    else
    this.p=false;
    this.send.Airplane_No = e;
  }

  addTripDate(e){
    this.send.TripDate = new Date(e).toISOString().split('T')[0];
  }


  addDept(e){
    this.send.Departure_Time = e;
    console.log(e)
  }

  addArrivalTime(e){
    this.send.Arrival_Time = e;
    console.log(e)
  } 

  show(){
    console.log(this.send.Arrival_Time,this.send.Departure_Time,this.send.TripDate,this.send.Airplane_No)
    if(this.send.Arrival_Time==undefined||this.send.Departure_Time ==undefined||this.send.TripDate==undefined 
      ||this.send.Airplane_No==undefined||this.send.Airplane_No==''){
      if(this.send.Arrival_Time==undefined)
      this.at=true;
      else
      this.at=false;
      if(this.send.Departure_Time==undefined)
      this.dt=true;
      else
      this.dt=false;
      if(this.send.TripDate==undefined)
      this.d=true;
      else
      this.d=false;
      if(this.send.Airplane_No==undefined||this.send.Airplane_No=='')
      this.p=true;
      else
      this.p=false;

    }
    else
    this.http.post("http://localhost:57445/api/trip", this.send).subscribe(data => alert("Trip Added"))
  }
}
