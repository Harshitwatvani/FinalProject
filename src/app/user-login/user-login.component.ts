import { Component, OnInit } from '@angular/core';
import{ User } from '../models/User';
import { UserService } from '../services/UserService';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { AirportSearchService } from '../services/airport.Search';
import { Router } from '@angular/router';
import { navService } from '../services/navService';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  username;
  password;
  logins;
  e;
  p;
  myForm:FormGroup;
  result;
  user:User;

  constructor(private service:UserService,private airSer:AirportSearchService, private router:Router, private navSer: navService, private cookieSer: CookieService) {
    this.e=new String();
    this.p=new String();
    this.logins=[];
    this.user=new User();
      //this.login=new User();
      this.myForm=new FormGroup({
        email:new FormControl(null,[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        pass:new FormControl(null,[Validators.required])      
  
      });

  }

  public get email(){
    return this.myForm.get('email');
  }

  public get pass(){
    return this.myForm.get('pass');
  }
  login(){
    if(this.myForm.valid){
      this.user.Email=this.email.value;
      this.user.Password=this.pass.value;
      // console.log(this.user.Password,this.user.Email);
    this.service.getUserLogin(this.user).subscribe((data)=>{
      // console.log(data);
      if(data=="Logged in"){
      console.log("success");
      this.result="Logged in";

      this.e=null;
      this.p=null;
      this.service.getUserID(this.user.Email).subscribe((data)=>{
        // console.log(data);
        this.airSer.uid=data.toString();
        // console.log(this.airSer.uid);
        this.cookieSer.set('UserID', this.airSer.uid);
        this.cookieSer.set('Type', "User");
      })
      this.user=new User();
      this.navSer.navHome = false;
      this.navSer.navAdmin = false;
      this.navSer.navUser = true;
      this.router.navigate(['/search'])

    }
    else
    this.result="Incorrect User or password";
    
    })
  }
  else
  {
    this.result="Incorrect User or password";
    this.p=null;
  }
   
    
  }
  cancel(){
    this.myForm.reset();
  }
  ngOnInit(): void {
  }

}
