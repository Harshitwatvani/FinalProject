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
    public class PassengerController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Passenger
        public IQueryable<tblpassenger_table> Gettblpassenger_table()
        {

            return db.tblpassenger_table;
        }

        // GET: api/Passenger/5
        [ResponseType(typeof(tblpassenger_table))]
        public IHttpActionResult Gettblpassenger_table(string id)
        {
            List<proc_displaypassengers_Result> DisplayPassenger = new List<proc_displaypassengers_Result>();

            foreach (var item in db.proc_displaypassengers(id))
            {
                DisplayPassenger.Add(item);
            }

            if (DisplayPassenger == null)
            {
                return NotFound();
            }

            return Ok(DisplayPassenger);
        }

        // PUT: api/Passenger/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttblpassenger_table(string id, tblpassenger_table tblpassenger_table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblpassenger_table.PassengerID)
            {
                return BadRequest();
            }

            db.Entry(tblpassenger_table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblpassenger_tableExists(id))
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

        // POST: api/Passenger
        [ResponseType(typeof(tblpassenger_table))]
        public IHttpActionResult Posttblpassenger_table(tblpassenger_table tblpassenger_table)
        {
            db.proc_insertpassengers(tblpassenger_table.TicketID, tblpassenger_table.PName, tblpassenger_table.Gender, tblpassenger_table.SeatID, tblpassenger_table.Age);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.tblpassenger_table.Add(tblpassenger_table);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblpassenger_table.PassengerID }, tblpassenger_table);
        }

        // DELETE: api/Passenger/5
        [ResponseType(typeof(tblpassenger_table))]
        public IHttpActionResult Deletetblpassenger_table(string id)
        {
            tblpassenger_table tblpassenger_table = db.tblpassenger_table.Find(id);
            if (tblpassenger_table == null)
            {
                return NotFound();
            }

            db.tblpassenger_table.Remove(tblpassenger_table);
            db.SaveChanges();

            return Ok(tblpassenger_table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblpassenger_tableExists(string id)
        {
            return db.tblpassenger_table.Count(e => e.PassengerID == id) > 0;
        }
    }
}