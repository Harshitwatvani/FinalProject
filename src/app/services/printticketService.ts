import { Ticket } from "../models/ticket"
import { Cancelticket } from "../models/cancelticket"
import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AirportSearchService } from './airport.Search';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class PrintticketService{

   tickets : Ticket[]
    constructor(private http:HttpClient,private airSer:AirportSearchService,private cookieSer:CookieService){
        this.tickets = [];
    }

    public getTicket(id:string){
        //id = this.airSer.bid;
        return this.http.get("http://localhost:57445/api/PrintTicket/"+id);
    }
    public getCancelTicket(id:string){
        id = this.cookieSer.get('UserID')
        return this.http.get("http://localhost:57445/api/CancelTicket/"+id);
    }

    public postCancelTicket(ticket:Cancelticket){
        console.log(ticket);
        return this.http.post("http://localhost:57445/api/CancelTicket",ticket);
    }
}