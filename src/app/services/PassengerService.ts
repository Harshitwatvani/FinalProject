import { Passenger } from "../models/Passenger"
import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AirportSearchService } from './airport.Search';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class PassengerService{
    seatTicketDetails;
    totalAmount:number;
    passengers:Passenger[];
    tickets;
    constructor(private http:HttpClient,private airport:AirportSearchService,private cookieSer:CookieService){
        this.passengers = [];
        this.tickets=[];
        
    }

    public getPassengers(id:string){
      id=this.cookieSer.get('UserID');
        return this.http.get("http://localhost:57445/api/Passenger/"+id);
    }
    public postPassengers(passenger:Passenger){
       // passenger.SeatID="3B";
        return this.http.post("http://localhost:57445/api/Passenger",passenger);
    }
  
}