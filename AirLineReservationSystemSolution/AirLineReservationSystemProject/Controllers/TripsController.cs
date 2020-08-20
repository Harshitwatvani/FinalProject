
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
    public class TripsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/Trips
        public IEnumerable<string> Get()
        {
            return db.allTrips();
        }

        // GET: api/Trips/5
        public TripByID_Result Get(string id)
        {
            return db.TripByID(id).ToList()[0];
        }

        // POST: api/Trips
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Trips/5
        public void Put(int id, [FromBody]tblTrip trip)
        {
			db.alterTrip(trip.TripID, trip.Airplane_No, trip.Departure_Time, trip.Arrival_Time);
		}

        // DELETE: api/Trips/5
        public void Delete(int id)
        {
        }
    }
}
