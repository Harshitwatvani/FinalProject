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
using System.Web.Security;
using AirLineReservationSystemProject;

namespace AirLineReservationSystemProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AdminsController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/tblAdmins
        public List<proc_AdminLogin_Result> GettblAdmins()
        {
            db.proc_AdminLogin();
            List<proc_AdminLogin_Result> login = new List<proc_AdminLogin_Result>();
            foreach (var item in db.proc_AdminLogin())
            {
                login.Add(item);
            }
            return login;
        }

        // GET: api/tblAdmins/5
        [ResponseType(typeof(tblAdmin))]
        [HttpPost]
        public IHttpActionResult PosttblAdmin(proc_AdminLogin_Result admin)
        {
            string a = null ;
            List<proc_AdminLogin_Result> login = new List<proc_AdminLogin_Result>();
            foreach (var item in db.proc_AdminLogin())
            {
                login.Add(item);
            }
            foreach (var item in login)
            {
                if (item.Email == admin.Email && item.Passwords == admin.Passwords)
                {
                    FormsAuthentication.SetAuthCookie(item.Email, false);
                    a = "Logged in";
                }
            }

            //tblUser tblUser = db.tblUsers.Find(id);
            if (a == null)
            {
                return Ok("wrong");
            }

            return Ok(a);
        }

        // PUT: api/tblAdmins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblAdmin(string id, tblAdmin tblAdmin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblAdmin.AdminID)
            {
                return BadRequest();
            }

            db.Entry(tblAdmin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblAdminExists(id))
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

        //// POST: api/tblAdmins
        //[ResponseType(typeof(tblAdmin))]
        //public IHttpActionResult PosttblAdmin(tblAdmin tblAdmin)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.tblAdmins.Add(tblAdmin);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = tblAdmin.AdminID }, tblAdmin);
        //}

        // DELETE: api/tblAdmins/5
        [ResponseType(typeof(tblAdmin))]
        public IHttpActionResult DeletetblAdmin(string id)
        {
            tblAdmin tblAdmin = db.tblAdmins.Find(id);
            if (tblAdmin == null)
            {
                return NotFound();
            }

            db.tblAdmins.Remove(tblAdmin);
            db.SaveChanges();

            return Ok(tblAdmin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblAdminExists(string id)
        {
            return db.tblAdmins.Count(e => e.AdminID == id) > 0;
        }
    }
}