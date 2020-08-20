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
    public class ViewBookingController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();
        public IHttpActionResult Getsp_viewBooking(string id)
        {
            List<sp_viewBooking_Result> ViewBooking = new List<sp_viewBooking_Result>();

            foreach (var item in db.sp_viewBooking(id))
            {
                ViewBooking.Add(item);
            }

            if (ViewBooking == null)
            {
                return NotFound();
            }

            return Ok(ViewBooking);
        }
    }
}
