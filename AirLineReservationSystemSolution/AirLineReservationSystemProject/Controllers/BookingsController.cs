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
    public class BookingsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Bookings
        public IQueryable<tblBooking> GettblBookings()
        {
            return db.tblBookings;
        }

        // GET: api/Bookings/5
        [ResponseType(typeof(tblBooking))]
        public List<proc_GetBookings_Result> GettblBooking(string id)
        {
            //tblBooking tblBooking = db.tblBookings.Find(id);
            //tblBooking tblBooking= db.proc_GetBooking(id).ToList();
            List<proc_GetBookings_Result> booking = new List<proc_GetBookings_Result>();
            foreach (var item in db.proc_GetBookings(id))
            {
                booking.Add(item);
            }
            

            return booking;
        }

        // PUT: api/Bookings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblBooking(string id, tblBooking tblBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblBooking.BID)
            {
                return BadRequest();
            }

            db.Entry(tblBooking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblBookingExists(id))
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

        // POST: api/Bookings
        [ResponseType(typeof(tblBooking))]
        public IHttpActionResult PosttblBooking(tblBooking tblBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.tblBookings.Add(tblBooking);
            db.proc_Booking(tblBooking.UserID);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblBooking.BID }, tblBooking);
        }

        // DELETE: api/Bookings/5
        [ResponseType(typeof(tblBooking))]
        public IHttpActionResult DeletetblBooking(string id)
        {
            tblBooking tblBooking = db.tblBookings.Find(id);
            if (tblBooking == null)
            {
                return NotFound();
            }

            db.tblBookings.Remove(tblBooking);
            db.SaveChanges();

            return Ok(tblBooking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblBookingExists(string id)
        {
            return db.tblBookings.Count(e => e.BID == id) > 0;
        }
    }
}