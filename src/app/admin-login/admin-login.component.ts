import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import{Admin} from '../models/Admin';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import { navService } from '../services/navService';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
username;
password;
admin:Admin;
logins;
result;
e;
p;
myForm:FormGroup;
  constructor(private service:UserService, private navSer: navService,private router:Router, private cookieSer: CookieService) {
    this.e=new String();
    this.p=new String();
    this.admin=new Admin();
    this.logins=[];
    this.admin.AdminID="A1";

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
      this.admin.Email=this.email.value;
      this.admin.Passwords=this.pass.value;
      console.log(this.admin.Passwords,this.admin.Email);
    this.service.getAdminLogin(this.admin).subscribe((data)=>{
      if(data=="Logged in"){
      this.navSer.navHome = false;
      this.navSer.navAdmin = true;
      this.navSer.navUser = false;
      this.result="Logged In";
      this.e=null;
      this.p=null;
      this.cookieSer.set('UserID', this.admin.Email)
      this.cookieSer.set('Type', "Admin")
      this.router.navigate(['/display-flights'])
      }
      else
      {
        this.result="Incorrect User or password";
      }
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
  // this.myForm.patchValue({
  //   email:null,
  //   password:null
  // })

}
  ngOnInit(): void {
  }

}
