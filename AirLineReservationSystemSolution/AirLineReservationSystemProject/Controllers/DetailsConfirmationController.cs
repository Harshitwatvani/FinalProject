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
    public class DetailsConfirmationController : ApiController
    {
        AirlineReservationEntities entities = new AirlineReservationEntities();
        [HttpGet]
        public IEnumerable<proc_DetailsConfirmation1_Result> Get(string id)
        {
            List<proc_DetailsConfirmation1_Result> details = new List<proc_DetailsConfirmation1_Result>();
            foreach (var item in entities.proc_DetailsConfirmation1(id))
            {
                details.Add(item);
            } 
            return details;
        }
    }
}
