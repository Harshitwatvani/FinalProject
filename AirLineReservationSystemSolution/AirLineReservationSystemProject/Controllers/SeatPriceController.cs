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
    public class SeatPriceController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/SeatPrice
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SeatPrice/5
        public SeatPrice_Result Get(string id)
        {
            return db.SeatPrice(id).ToList()[0];
        }

        // POST: api/SeatPrice
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SeatPrice/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SeatPrice/5
        public void Delete(int id)
        {
        }
    }
}
