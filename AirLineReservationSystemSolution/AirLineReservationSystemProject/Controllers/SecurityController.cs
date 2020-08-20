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
    public class SecurityController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Security
        public IQueryable<tblUser> GettblUsers()
        {
            return db.tblUsers;
        }

        // GET: api/Security/5
        [ResponseType(typeof(tblUser))]
        public IHttpActionResult GettblUser(string id)
        {
            tblUser tblUser = db.tblUsers.Find(id);
            if (tblUser == null)
            {
                return NotFound();
            }

            return Ok(tblUser);
        }

        // PUT: api/Security/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblUser(string id, tblUser tblUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != tblUser.UserID)
            //{
            //    return BadRequest();
            //
            db.proc_updateUser2(tblUser.Email, tblUser.Password);
           // db.Entry(tblUser).State = EntityState.Modified;
           
                db.SaveChanges();
            

            return Ok("updated");
        }

        // POST: api/Security
        [ResponseType(typeof(tblUser))]
        [HttpPost]
        public IHttpActionResult PosttblUser(tblUser tblUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            List<proc_getUserByEmail_Result> security = new List<proc_getUserByEmail_Result>();
            foreach (var item in db.proc_getUserByEmail(tblUser.Email,tblUser.Security))
            {
                security.Add(item);
            }
            if (security.Count>0)
            {
                return Ok("contains");
            }
           // db.tblUsers.Add(tblUser);
           // db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblUser.UserID }, tblUser);
        }

        // DELETE: api/Security/5
        [ResponseType(typeof(tblUser))]
        public IHttpActionResult DeletetblUser(string id)
        {
            tblUser tblUser = db.tblUsers.Find(id);
            if (tblUser == null)
            {
                return NotFound();
            }

            db.tblUsers.Remove(tblUser);
            db.SaveChanges();

            return Ok(tblUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblUserExists(string id)
        {
            return db.tblUsers.Count(e => e.UserID == id) > 0;
        }
    }
}