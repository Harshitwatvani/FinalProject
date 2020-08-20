using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class CancelTicketController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        [HttpGet]
        public IHttpActionResult GetTicket(string id)
        {
            List<sp_cancelTicket1_Result> cticket = new List<sp_cancelTicket1_Result>();

            foreach (var item in db.sp_cancelTicket1(id))
            {
                cticket.Add(item);
            }

            if (cticket == null)
            {
                return NotFound();
            }

            return Ok(cticket);
        }

        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PuttblTicket_table( sp_cancelTicket1_Result cancelticket )
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != cancelticket.TicketID)
            //{
            //    return BadRequest();
            //}

            //db.sp_cancelticketStatus(id);
            // db.Entry(cancelticket).State = EntityState.Modified;
           db.sp_cancelticketStatus(cancelticket.TicketID);
           db.sp_cancelSeat(cancelticket.TicketID);
            db.SaveChanges();


            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!tblTicket_tableExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.NoContent);
        }

      
        private bool tblTicket_tableExists(string id)
        {
            throw new NotImplementedException();
        }
    }
}
