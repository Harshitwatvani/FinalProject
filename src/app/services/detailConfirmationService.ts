import{DetailConfirmation} from '../models/DetailConfirmationModel'
import{HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class DetailConfirmationService{
   
    details:DetailConfirmation[];

    constructor(private http:HttpClient){
this.details=[];

    }
    public getDetails(id:string){
        return this.http.get("http://localhost:57445/api/DetailsConfirmation/"+id)
    }
}