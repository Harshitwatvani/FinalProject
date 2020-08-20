import { Booking } from "../models/booking"
import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AirportSearchService } from './airport.Search';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class ViewbookingService{

    bookings:Booking[];
    constructor(private http:HttpClient,private airSer:AirportSearchService,private cookieSer:CookieService){
        this.bookings = [];
    }

    public getBookings(id:string){
        id = this.cookieSer.get('UserID');
        console.log(id,this.airSer.uid);
        return this.http.get("http://localhost:57445/api/ViewBooking/"+id);
    }
}