import{HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import{ User } from '../models/User';
import{Admin} from '../models/Admin';
import { Observable, observable } from 'rxjs';

@Injectable()
export class UserService{

    user;
    users:User[];
    admins:Admin[];

        constructor(private http:HttpClient){
            this.users=[];

        }
        public getUserLogin(user){
            console.log(user);
           //return this.http.post("http://localhost:57445/api/Users?Email=Ramu@gmail.com&id=1",password);
            return this.http.post("http://localhost:57445/api/Users",user);
        }
        public getUser(){
            return this.http.get("http://localhost:57445/api/Users");
        }
        public getUserID(id){
            return this.http.get("http://localhost:57445/api/UserRegisteration/1?id="+id);
        }
        public addUser(user){
            return this.http.post("http://localhost:57445/api/UserRegisteration",user);

        }
        public getAdminLogin(admin){
            console.log(admin);
            return this.http.post("http://localhost:57445/api/Admins",admin);
        }
       
        public getSecurity(user){
            return this.http.post("http://localhost:57445/api/Security",user);
        }
        public updatePassword(user){
            return this.http.put("http://localhost:57445/api/Security/U1",user);
        }
}