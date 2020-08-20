import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import{Payment} from '../models/Payment';
import { AirportSearchService } from './airport.Search';
import { PassengerService } from './PassengerService';
@Injectable()
export class PaymentService{
    constructor(private http:HttpClient,private airport:AirportSearchService,private passSer:PassengerService){

    }

    public postPayment(payment:Payment){
payment.Payment_Amount=this.passSer.totalAmount.toString();
payment.Bid=this.airport.bid;
console.log(payment);
//payment.Bid= "B15";//this.airport.bid;
         return this.http.post("http://localhost:57445/api/Payment",payment);
     }
}