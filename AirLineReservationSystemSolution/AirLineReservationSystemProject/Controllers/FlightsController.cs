
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
    public class FlightsController : ApiController
    {

        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/Flights
        public List<addTripsDetails_Result> Get()
        {
            return db.addTripsDetails().ToList();
        }
        // GET: api/Flights/5
        public string Get(int id)
        {
            return "value";
        }


        // POST: api/Flights
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Flights/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Flights/5
        public void Delete(int id)
        {
        }
    }
}
