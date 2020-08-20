
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
    public class PassengersController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Passenger
        public string Get()
        {
            return "Working";
        }

        // GET: api/Passenger/5
        public List<string> Get(string id)
        {
            return db.passengers(id).ToList();
        }

        // POST: api/Passenger
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Passenger/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Passenger/5
        public void Delete(int id)
        {
        }
    }
}
