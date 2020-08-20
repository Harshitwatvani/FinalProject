
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
    public class SeatController : ApiController
    {

        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Seat
        public string Get()
        {
            return "Working";
        }

        // GET: api/Seat/5
        public List<planeSeats_Result> Get(string id)
        {
            return db.planeSeats(id).ToList();
        }

        // POST: api/Seat
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Seat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Seat/5
        public void Delete(int id)
        {
        }
    }
}
