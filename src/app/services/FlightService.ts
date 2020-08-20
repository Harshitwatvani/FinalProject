import{HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Flight} from '../models/Flight';

@Injectable()
export class FlightService{

    constructor(private http:HttpClient){

    }

    public getFlight(){
        return this.http.get("http://localhost:57445/api/AddFlight");
    }
    public addFlight(flight){
        return this.http.post("http://localhost:57445/api/AddFlight",flight);

    }
    public EditFlight(id:string,flight){
        return this.http.put("http://localhost:57445/api/AddFlight/"+id,flight);
    }
}