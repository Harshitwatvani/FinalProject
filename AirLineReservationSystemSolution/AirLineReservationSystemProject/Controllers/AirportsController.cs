using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using AirLineReservationSystemProject;
namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AirportsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Airports
        //public IQueryable<tbl_Airports> Gettbl_Airports()
        //{
        //    return db.tbl_Airports;
        //}

        // GET: api/Airports/5
        //[ResponseType(typeof(tbl_Airports))]

        public IHttpActionResult Gettbl_Airports(string id)
        {
            //tbl_Airports tbl_Airports = db.tbl_Airports.Find(id);
            //var airportList = db.tbl_Airports.ToList().Find(m =>m.airport_name.Contains(term) || m.city_name.Contains(term));
            
            var airportList = from c in db.tbl_Airports where c.airport_name.Contains(id) || c.city_name.Contains(id) select c; 
            if (airportList == null)
            {
                return NotFound();
            }

            return Ok(airportList);
        }

        // PUT: api/Airports/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_Airports(string id, tbl_Airports tbl_Airports)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_Airports.IATA_code)
            {
                return BadRequest();
            }

            db.Entry(tbl_Airports).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_AirportsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Airports
        [ResponseType(typeof(tbl_Airports))]
        public IHttpActionResult Posttbl_Airports(tbl_Airports tbl_Airports)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbl_Airports.Add(tbl_Airports);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tbl_AirportsExists(tbl_Airports.IATA_code))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tbl_Airports.IATA_code }, tbl_Airports);
        }

        // DELETE: api/Airports/5
        [ResponseType(typeof(tbl_Airports))]
        public IHttpActionResult Deletetbl_Airports(string id)
        {
            tbl_Airports tbl_Airports = db.tbl_Airports.Find(id);
            if (tbl_Airports == null)
            {
                return NotFound();
            }

            db.tbl_Airports.Remove(tbl_Airports);
            db.SaveChanges();

            return Ok(tbl_Airports);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_AirportsExists(string id)
        {
            return db.tbl_Airports.Count(e => e.IATA_code == id) > 0;
        }
    }
}