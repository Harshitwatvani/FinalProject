import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import{DetailConfirmationService} from './services/detailConfirmationService';
import{ UserService } from './services/UserService';
import{FlightService} from './services/FlightService';
import{PassengerService} from './services/PassengerService';
import{AirportSearchService} from './services/airport.Search';
import{PrintticketService} from './services/printticketService';
import{ViewbookingService} from './services/viewbookingService';
import{navService} from './services/navService'; 
import{PaymentService} from './services/paymentService'

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsConfirmationComponent } from './details-confirmation/details-confirmation.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import{PassengersComponent} from './passengers/passengers.component';
import { ShowPassengersComponent } from './show-passengers/show-passengers.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { RoundtripSeatBookComponent } from './roundtrip-seat-book/roundtrip-seat-book.component';
import { SeatBookComponent } from './seat-book/seat-book.component';
import { CancelticketComponent } from './cancelticket/cancelticket.component';
import { NavbarloginComponent } from './navbarlogin/navbarlogin.component';
import { NavbaradminComponent } from './navbaradmin/navbaradmin.component';
import { NavbarhomeComponent } from './navbarhome/navbarhome.component';
import { NavbaruserComponent } from './navbaruser/navbaruser.component';
import { PrintticketComponent } from './printticket/printticket.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { Passenger } from './models/Passenger';
import {AuthGuardService} from './services/userAuth';
import {UserCanActivate} from './services/UserCanActivate';
import {AdminActivate} from './services/AdminAuth';
import { PaymentComponent } from './payment/payment.component';
import {updateAuth} from './services/updateAuth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'
// import { MatLabel } from '@angular/material/form-field';

var routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full' },
  {path: "search", component: FlightSearchComponent, canActivate:[AdminActivate]},
  {path: "seat-booking", component: SeatBookComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path: "roundtrip-seat-book", component: RoundtripSeatBookComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"passenger-details",component:PassengersComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"passenger-confirmation",component:DetailsConfirmationComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"print-ticket",component:PrintticketComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"Login", component:UserLoginComponent},
  {path:"nav-login",component:NavbarloginComponent},
  {path:"register",component:UserRegisterationComponent},
  {path:"cancel-ticket",component:CancelticketComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"my-bookings",component:ViewbookingsComponent, canActivate: [AuthGuardService, AdminActivate]},
  {path:"display-flights",component:FlightDetailsComponent, canActivate: [AuthGuardService, UserCanActivate]},
  {path:"add-flights",component:AddFlightComponent, canActivate: [AuthGuardService, UserCanActivate]},
  {path:"add-trips",component:AddTripComponent, canActivate: [AuthGuardService, UserCanActivate]},
  {path:"edit-trips",component:EditTripComponent, canActivate: [AuthGuardService, UserCanActivate]},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"update-password",component:ChangePasswordComponent, canActivate: [updateAuth]},
  {path:"payment",component:PaymentComponent, canActivate: [AuthGuardService, AdminActivate]}
]
   
@NgModule({
  declarations: [
    AppComponent,
    DetailsConfirmationComponent,
    UserRegisterationComponent,
    UserLoginComponent,
    AdminLoginComponent,
    AddFlightComponent,
    FlightDetailsComponent,
    PassengersComponent,
    ShowPassengersComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    FlightSearchComponent,
    AddTripComponent,
    EditTripComponent,
    RoundtripSeatBookComponent,
    SeatBookComponent,
    CancelticketComponent,
    NavbarloginComponent,
    NavbaradminComponent,
    NavbarhomeComponent,
    NavbaruserComponent,
    PrintticketComponent,
    ViewbookingsComponent,
    PaymentComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],

  providers: [DetailConfirmationService,UserService,FlightService,
    PassengerService,AirportSearchService,PrintticketService,
    ViewbookingService, navService, AuthGuardService, UserCanActivate, AdminActivate,PaymentService, updateAuth],
  bootstrap: [AppComponent]
})

export class AppModule { }
