import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/paymentService';
import { Payment } from '../models/Payment';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportSearchService } from '../services/airport.Search';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
payment:Payment;
result;
myForm:FormGroup;
  constructor(private paymentService:PaymentService,private router:Router,private airService:AirportSearchService) {
    this.payment=new Payment();
    if(this.airService.bid== null){
      this.router.navigate(['/search'])
      return
    }

    this.myForm=new FormGroup({
      card:new FormControl(null,[Validators.required,Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]),
      cvv:new FormControl(null,[Validators.required,Validators.max(999),Validators.minLength(3)])
    });
   }
   public get card(){
    return this.myForm.get('card');
  }
  public get cvv(){
    return this.myForm.get('cvv');
  }

pay(){
  this.payment.Payment_Status="Confirmed";
  this.paymentService.postPayment(this.payment).subscribe((data)=>{
this.result=data;
console.log(data);
alert('Payment Successful')
this.router.navigate(["/print-ticket"]);
  })
}
  ngOnInit(): void {
  }

}
