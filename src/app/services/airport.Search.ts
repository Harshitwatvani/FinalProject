import { Injectable } from '@angular/core';  
import {HttpClient,HttpResponse} from "@angular/common/http";
import {Airports,FlightDetail,Booking,BookingPost,Tickets} from '../models/airport';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()  

export class AirportSearchService{
     url:string;
    flights:FlightDetail[];
	book:Booking;
	booked:BookingPost;
	ticket:Tickets;
	from:string;
	to:string;
	bid:string;
	uid:string;
    constructor(private http:HttpClient)
    {  
		
         this.book=new Booking();
		 this.booked=new BookingPost();
		 this.ticket=new Tickets();
    }
	public getTickets(){
		console.log(this.bid);
        return this.http.get("http://localhost:57445/api/Tickets/"+this.bid);
    }
    public getAirports(term:String)
    {
       var airportList= this.http.get("http://localhost:57445/api/Airports/"+term);
      // console.log(typeof(airportList));
      return airportList;
    }
	
	public showFlights(flight:FlightDetail)
	{
		this.from=flight.deptCityName;
		this.to=flight.arrivalCityName;
		// console.log(flight);
		return this.http.post("http://localhost:57445/api/FlightDetails",flight);
			
	}
	
	public bookingsPost(booked)
	{
		console.log("in booking post "+booked);
		return this.http.post("http://localhost:57445/api/Bookings",booked);
		
	}
	public bookingsGet(id:string)
	{
		console.log("in booking get "+id);
		return this.http.get("http://localhost:57445/api/Bookings/"+id);
		
	}
	
	public ticketPost(ticket,bid)
	{
		console.log(bid);
		this.bid=bid;
		console.log(ticket);
		return this.http.post("http://localhost:57445/api/Tickets",ticket);
		
	}
     storeFlight(obj,name,num)
	 {
		 this.book.Passenger=num;
		 console.log(this.book.Passenger);
		 console.log(obj);
		 if(name=='book')
		 {
			this.book.Airplane_no = obj.Airplane_no;
			this.book.TripID= obj.TripID;
		 
		 console.log("in storeFlight "+ this.book.Airplane_no);
		 console.log("in storeFlight "+ this.book.TripID); 
		 }
		 else
		 {
			this.book.Airplane_no_round = obj.Airplane_no;
			this.book.TripID_round= obj.TripID;
		 
			console.log("in storeFlight2 "+ this.book.Airplane_no_round);
			console.log("in storeFlight2 "+ this.book.TripID_round); 
		 }
		 
	 }
	
}