using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class PrintTicketController : ApiController
    {

        private AirlineReservationEntities db = new AirlineReservationEntities();
        public IHttpActionResult GetTicket(string id)
        {
            List < sp_downloadticket_Result> Ticket = new List<sp_downloadticket_Result>();

            foreach (var item in db.sp_downloadticket(id))
            {
                Ticket.Add(item);
            }

            if (Ticket == null)
            {
                return NotFound();
            }

            return Ok(Ticket);
        }
    }
}
