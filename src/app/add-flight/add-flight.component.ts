import { Component, OnInit } from '@angular/core';
import { Flight } from '../models/Flight';
import { FlightService } from '../services/FlightService';
import { FormsModule, FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  flight:Flight;
  flights:Flight[];
  e:boolean;
  b:boolean;
  f:boolean;
  td:boolean=false;
  ct:boolean=false;
  myForm:FormGroup;
  constructor(private service:FlightService) { 
    this.flight=new Flight();
  this.e=false;
  this.b=false;
  this.f=false;
  this.flight.FlightStatus="Active";
  this.myForm=new FormGroup({
        
    from:new FormControl(null,[Validators.required]),
    to:new FormControl(null,[Validators.required])      

  });

  
  }

  public get from(){
    return this.myForm.get('from');
  }

  public get to(){
    return this.myForm.get('to');
  }

  add(){
    
    this.TravelDays();
      this.CabinType();
      console.log(this.flight.TravelDays,this.flight.CabinType);
      if(this.flight.TravelDays=="0000000")
      {
        this.td=true;

      }
      else if(this.flight.CabinType=="")
      {
this.ct=true;
      }
      
    else if(this.myForm.valid)
    {
      
      this.flight.DeparturePoint=this.from.value;
      this.flight.ArrivalPoint=this.to.value;
      console.log(this.flight)
    this.service.addFlight(this.flight).subscribe((data)=>{
      console.log(data);
      alert('Flight added');
      this.flight=new Flight();
    })
  }
  }
  title = 'angular-checkbox-list-demo';
  CabinType(){
    this.flight.CabinType="";
    if(this.FairItemsList.find((a)=>a.label=='Economy') )
    this.flight.CabinType=this.flight.CabinType+'E'; 
    if(this.FairItemsList.find((a)=>a.label=='Business') )
    this.flight.CabinType=this.flight.CabinType+'B'; 
    if(this.FairItemsList.find((a)=>a.label=='First Class') )
    this.flight.CabinType=this.flight.CabinType+'F';    
    console.log(this.flight.CabinType);     
  

    
  }

  
  TravelDays(){
    this.flight.TravelDays="";
    if(this.selectedItemsList.find((a)=>a.label=='Monday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';         
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
    
    if(this.selectedItemsList.find((a)=>a.label=='Tuesday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
         else
      this.flight.TravelDays=this.flight.TravelDays+'0';
    
    if(this.selectedItemsList.find((a)=>a.label=='Wednesday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
    
    if(this.selectedItemsList.find((a)=>a.label=='Thursday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
  
    if(this.selectedItemsList.find((a)=>a.label=='Friday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
    
    if(this.selectedItemsList.find((a)=>a.label=='Saturday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
 
    if(this.selectedItemsList.find((a)=>a.label=='Sunday') )
      this.flight.TravelDays=this.flight.TravelDays+'1';
    else
      this.flight.TravelDays=this.flight.TravelDays+'0';
    
    console.log(this.flight.TravelDays);
  }

  selectedItemsList = [];
  FairItemsList=[];
  checkedIDs = [];
  FairIDs=[];
  FairDataList = [
    {
      id: 'C001',
      label: 'Economy',
      isChecked: false
    },
    {
      id: 'C002',
      label: 'Business',
      isChecked: false
    },
    {
      id: 'C003',
      label: 'First Class',
      isChecked: false
    }
  ]
  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Monday',
      isChecked: false
    },
    {
      id: 'C002',
      label: 'Tuesday',
      isChecked: false
    },
    {
      id: 'C003',
      label: 'Wednesday',
      isChecked: false
    },
    {
      id: 'C004',
      label: 'Thursday',
      isChecked: false
    },
    {
      id: 'C004',
      label: 'Friday',
      isChecked: false
    },
    {
      id: 'C005',
      label: 'Saturday',
      isChecked: false
    },
    {
      id: 'C006',
      label: 'Sunday',
      isChecked: false
    }
  ]

  ngOnInit(): void {
    
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
  }

  changeSelection() {
    this.fetchSelectedItems()
    if(this.FairItemsList.find((a)=>a.label=='Economy') )
    this.e=true;
    else
    this.e=false;

    if(this.FairItemsList.find((a)=>a.label=='Business') )
    this.b=true;
    else
    this.b=false;
    if(this.FairItemsList.find((a)=>a.label=='First Class') )
    this.f=true;
    else
    this.f=false;
    //console.log(this.e);
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
    this.FairItemsList = this.FairDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
    this.FairIDs = []
    this.FairDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.FairIDs.push(value.id);
      }
    });
  }


}
