using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace AirLineReservationSystemProject
{
   [DataContract]
        public class FlightSearch
        {



            [DataMember]
            public string tripType { get; set; }
            [DataMember]
            public string deptCityName { get; set; }
            [DataMember]
            public string arrivalCityName { get; set; }
            [DataMember]
            public DateTime deptdate { get; set; }
            [DataMember]
            public DateTime returndate { get; set; }
            [DataMember]
            public int Passenger { get; set; }
        }
    
}