import { Component, OnInit } from '@angular/core';
import{ User } from '../models/User';
import { UserService } from '../services/UserService';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['./user-registeration.component.css']
})
export class UserRegisterationComponent implements OnInit {

  user:User;
  b:boolean=false;
  d:boolean=false;
  users:User[];
  c:boolean=false;
  myForm:FormGroup;
  constructor(private userService:UserService) { 
    this.user=new User();
    this.users=[];
    this.myForm=new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      fname:new FormControl(null,[Validators.required,Validators.maxLength(60)]),
      lname:new FormControl(null,[Validators.maxLength(60)]),
      email:new FormControl(null,[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      pass:new FormControl(null,[Validators.required]),
      cpass:new FormControl(null,null),
      dob:new FormControl(null,[Validators.required]),
      num:new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      security:new FormControl(null,[Validators.required,Validators.maxLength(20)])

    

    });
  }

  public get title(){
    return this.myForm.get('title');
  }
  public get fname(){
    return this.myForm.get('fname');
  }
  public get lname(){
    return this.myForm.get('lname');
  }
  public get email(){
    return this.myForm.get('email');
  }
  public get pass(){
    return this.myForm.get('pass');
  }
  public get cpass(){
    return this.myForm.get('cpass');
  }
  public get dob(){
    return this.myForm.get('dob');
  }
  public get num(){
    return this.myForm.get('num');
  }
  public get security(){
    return this.myForm.get('security');
  }

addUser(){
  console.log(this.user.DOB);
  if(this.user.DOB==undefined)
  this.d=true;
  else
  this.d=false;
  if (this.pass.value!=this.cpass.value)
  this.b=true;
  else
  this.b=false;
  if(this.myForm.valid){
    this.user.Title=this.title.value;
    this.user.FirstName=this.fname.value;
    this.user.LastName=this.lname.value;
    this.user.Email=this.email.value;
    this.user.Password=this.pass.value;
    this.user.DOB=this.dob.value;
    this.user.PhoneNo=this.num.value;
    this.user.Security=this.security.value;
    console.log(this.user);
    this.userService.addUser(this.user).subscribe((data)=>{
      console.log(data);
      if(data=="Contains")
      {
           this.c=true;
      }
      else
      this.c=false;

    })
    this.user=new User();
  }
  
}
reset(){
this.myForm.reset();

}
  ngOnInit(): void {
  }

}
