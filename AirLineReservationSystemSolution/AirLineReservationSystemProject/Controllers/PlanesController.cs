
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
    public class PlanesController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/Planes
        public IEnumerable<string> Get()
        {
            return db.planes();
        }

        // GET: api/Planes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Planes
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Planes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Planes/5
        public void Delete(int id)
        {
        }
    }
}
