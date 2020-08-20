import { Component, OnInit } from '@angular/core';
import{ User } from '../models/User';
import { UserService } from '../services/UserService';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user:User;
  e;
  p;
  c:string;
  users:User[];
myForm:FormGroup;
  constructor(private userService:UserService,private router:Router, private cookSer:CookieService) { 
    this.user=new User();
    this.users=[];
    this.myForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      security:new FormControl(null,[Validators.required,Validators.maxLength(20)])
    });
  }
  public get email(){
    return this.myForm.get('email');
  }
  public get security(){
    return this.myForm.get('security');
  }
  proceed(){
    this.user.Email=this.email.value;
    this.user.Security=this.security.value;
    console.log(this.user);
    this.userService.getSecurity(this.user).subscribe((data)=>{
      console.log(data);
      if(data=="contains"){
        this.c="Correct";
        this.cookSer.set('update', '1');
      }
       this.router.navigate(["/update-password"]);
    })
  }

  ngOnInit(): void {
  }

}
