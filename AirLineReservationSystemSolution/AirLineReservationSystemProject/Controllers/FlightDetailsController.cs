
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AirLineReservationSystemProject;
namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class FlightDetailsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        //DateTime deptdate= 

        // GET: api/FlightDetails
        //public IEnumerable<proc_FlightSelect_Result> Get( )
        //{
        //deptdate=deptdate.ToShortDateString();

        //return db.proc_FlightSelect(deptCityName,arrivalCityName,deptdate,returndate,Passenger);
        //}

        // GET: api/FlightDetails/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FlightDetails
        public IEnumerable<SearchFlight2_Result> Post([FromBody]FlightSearch value)
        {
            return db.SearchFlight2(value.deptCityName, value.arrivalCityName, value.deptdate.Date, value.returndate.Date, value.Passenger);
        }

        // PUT: api/FlightDetails/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/FlightDetails/5
        public void Delete(int id)
        {
        }
    }
}
