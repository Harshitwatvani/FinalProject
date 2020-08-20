
using AirLineReservationSystemProject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Airline.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class TripController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/Trip
        public flightDetails_Result Get()
        {
            return db.flightDetails().ToList()[0];
        }


        // GET: api/Trip/5
        public time_Result Get(string id)
        {
            return db.time(id).ToList()[0];
        }

        // POST: api/Trip
        public void Post([FromBody]tblTrip trip)
        {
            db.addTrip(trip.FlightID, trip.Airplane_No, trip.TripDate.Date, trip.Departure_Time, trip.Arrival_Time);
        }

        // PUT: api/Trip/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Trip/5
        public void Delete(int id)
        {
        }
    }
}
