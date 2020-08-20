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
    public class TicketsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Tickets
        public IQueryable<tblTicket_table> GettblTicket_table()
        {
            return db.tblTicket_table;
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(tblTicket_table))]
        public IHttpActionResult GettblTicket_table(string id)
        {
            
            return Ok(db.proc_getTicket(id));
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblTicket_table(string id, tblTicket_table tblTicket_table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblTicket_table.TicketID)
            {
                return BadRequest();
            }

            db.Entry(tblTicket_table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblTicket_tableExists(id))
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

        // POST: api/Tickets
        [ResponseType(typeof(tblTicket_table))]
        public IHttpActionResult PosttblTicket_table(tblTicket_table tblTicket_table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.tblTicket_table.Add(tblTicket_table);
            db.proc_TicketBook(tblTicket_table.BID,tblTicket_table.TripID);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblTicket_table.TicketID }, tblTicket_table);
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(tblTicket_table))]
        public IHttpActionResult DeletetblTicket_table(string id)
        {
            tblTicket_table tblTicket_table = db.tblTicket_table.Find(id);
            if (tblTicket_table == null)
            {
                return NotFound();
            }

            db.tblTicket_table.Remove(tblTicket_table);
            db.SaveChanges();

            return Ok(tblTicket_table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblTicket_tableExists(string id)
        {
            return db.tblTicket_table.Count(e => e.TicketID == id) > 0;
        }
    }
}