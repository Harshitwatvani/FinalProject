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
    public class PaymentController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Payment
        public List<proc_getpayment_Result> GettblPayments()
        {
            return db.proc_getpayment().ToList();
        }

        // GET: api/Payment/5
        [ResponseType(typeof(tblPayment))]
        public IHttpActionResult GettblPayment(string id)
        {
            tblPayment tblPayment = db.tblPayments.Find(id);
            if (tblPayment == null)
            {
                return NotFound();
            }

            return Ok(tblPayment);
        }

        // PUT: api/Payment/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblPayment(string id, tblPayment tblPayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblPayment.Payment_ID)
            {
                return BadRequest();
            }

            db.Entry(tblPayment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblPaymentExists(id))
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

        // POST: api/Payment
        [ResponseType(typeof(tblPayment))]
        public IHttpActionResult PosttblPayment(tblPayment tblPayment)
        {
          
            db.proc_payment(tblPayment.Payment_Amount,tblPayment.Payment_Status,tblPayment.Bid) ;
            db.SaveChanges();

            return Ok("Paid");
        }

        // DELETE: api/Payment/5
        [ResponseType(typeof(tblPayment))]
        public IHttpActionResult DeletetblPayment(string id)
        {
            tblPayment tblPayment = db.tblPayments.Find(id);
            if (tblPayment == null)
            {
                return NotFound();
            }

            db.tblPayments.Remove(tblPayment);
            db.SaveChanges();

            return Ok(tblPayment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblPaymentExists(string id)
        {
            return db.tblPayments.Count(e => e.Payment_ID == id) > 0;
        }
    }
}