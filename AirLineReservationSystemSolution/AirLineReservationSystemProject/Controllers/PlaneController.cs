
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
    public class PlaneController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        // GET: api/Plane
        public IEnumerable<planeInfo_Result> Get()
        {
            return db.planeInfo("6e453");
        }

        // GET: api/Plane/5
        public planeInfo_Result Get(string id)
        {
            return db.planeInfo(id).ToList()[0];
        }

        // POST: api/Plane
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Plane/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Plane/5
        public void Delete(int id)
        {
        }
    }
}
