import { Component, OnInit } from '@angular/core';
import{ User } from '../models/User';
import { UserService } from '../services/UserService';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
myForm:FormGroup;
user:User;
users:User[];
  constructor(private userService:UserService,private router:Router, private cookieSer: CookieService) { 
    this.user=new User();
    this.users=[];
    this.myForm=new FormGroup({
      pass:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    

    

    });
  }
  public get pass(){
    return this.myForm.get('pass');
  }
  public get email(){
    return this.myForm.get('email');
  }
change(){
  if(this.myForm.valid){
    
    this.user.Email=this.email.value;
    this.user.Password=this.pass.value;
    console.log(this.user);
    this.userService.updatePassword(this.user).subscribe((data)=>{
      console.log(data);
      this.cookieSer.delete('update')
      alert('Password Changed Successfully!')
    this.router.navigate(["/nav-login"]);
    })
    this.user=new User();
  }
}
  ngOnInit(): void {
  }

}
