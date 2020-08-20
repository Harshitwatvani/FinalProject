export class Airports{
	
    airportName:string;
    cityName:string;
}

export class FlightDetail{
	tripType:string;
	deptCityName:string;
	arrivalCityName:string;
	deptdate:string;
	returndate:string;
	Passenger:number;
}


export class Booking{
	Airplane_no:string;
	TripID:string;
	Airplane_no_round:string;
	TripID_round:string;
	Passenger:number;
}

export class BookingPost{
	userID:string;
	BID:string;
	bookDate:string;
	bookStatus:string;
}

export class Tickets{
	ticketId:string;
	BID:string;
	TripId:string;
	TicketStatus:string;
	
}