import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SeatSelectServices{
    planeId:string;
    tripId:string;
    passengerNumber: number;
    
    planeId1:string;
    tripId1:string;

    constructor(private http: HttpClient){
        // console.log(this.SeatDetails)
    }

    saveDetail(id:string, tripId: string, passengersNumber: number) {
        this.planeId = id;
        this.tripId = tripId;        
        this.passengerNumber = passengersNumber;
    }

    saveDetailForRoundTrip(id:string, tripId: string, passengersNumber: number, planeid:string, tripID:string){
        this.planeId = id;
        this.tripId = tripId;        
        this.passengerNumber = passengersNumber;
        this.planeId1 = planeid;
        this.tripId1 = tripID;
    }
}