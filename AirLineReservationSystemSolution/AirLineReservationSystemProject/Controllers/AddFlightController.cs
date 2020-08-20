using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AirLineReservationSystemProject;

namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AddFlightController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/AddFlight
        public List<proc_ShowFlight_Result> Gettbl_FlightDetails()
        {
            
            List<proc_ShowFlight_Result> flight = new List<proc_ShowFlight_Result>();
            foreach (var item in db.proc_ShowFlight())
            {
                flight.Add(item);
            }
            return flight;
        }

        // GET: api/AddFlight/5
        [ResponseType(typeof(tbl_FlightDetails))]
        public IHttpActionResult Gettbl_FlightDetails(string id)
        {
            tbl_FlightDetails tbl_FlightDetails = db.tbl_FlightDetails.Find(id);
            if (tbl_FlightDetails == null)
            {
                return NotFound();
            }

            return Ok(tbl_FlightDetails);
        }

        // PUT: api/AddFlight/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_FlightDetails(string id, proc_ShowFlight_Result flight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flight.FlightId)
            {
                return BadRequest();
            }
            db.proc_EditFlight(id, flight.FlightStatus);

            //db.Entry(flight).State = EntityState.Modified;

            
                db.SaveChanges();


            return Ok(flight);
        }

        // POST: api/AddFlight
        [ResponseType(typeof(tbl_FlightDetails))]
        public IHttpActionResult Posttbl_FlightDetails(tbl_FlightDetails tbl_FlightDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.proc_AddFlight(tbl_FlightDetails.TravelDays,tbl_FlightDetails.DeparturePoint,tbl_FlightDetails.ArrivalPoint,
                tbl_FlightDetails.CabinType,tbl_FlightDetails.EconomyClassFair
                ,tbl_FlightDetails.BusinessClassFair,tbl_FlightDetails.FirstClassFair,tbl_FlightDetails.FlightStatus);
            //db.tbl_FlightDetails.Add(tbl_FlightDetails);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_FlightDetails.FlightId }, tbl_FlightDetails);
        }

        // DELETE: api/AddFlight/5
        [ResponseType(typeof(tbl_FlightDetails))]
        public IHttpActionResult Deletetbl_FlightDetails(string id)
        {
            tbl_FlightDetails tbl_FlightDetails = db.tbl_FlightDetails.Find(id);
            if (tbl_FlightDetails == null)
            {
                return NotFound();
            }

            db.tbl_FlightDetails.Remove(tbl_FlightDetails);
            db.SaveChanges();

            return Ok(tbl_FlightDetails);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_FlightDetailsExists(string id)
        {
            return db.tbl_FlightDetails.Count(e => e.FlightId == id) > 0;
        }
    }
}