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
    public class UsersController : ApiController
    {
        private AirlineReservationEntities db = new AirlineReservationEntities();

        // GET: api/Users
        public List<proc_UserLogin_Result> GettblUsers()
        {
            db.proc_UserLogin();
            List<proc_UserLogin_Result> login = new List<proc_UserLogin_Result>();
            foreach (var item in db.proc_UserLogin())
            {
                login.Add(item);
            }
            return login;
        }
        // GET: api/Users/5
        [HttpPost]
        public IHttpActionResult PosttblUser(proc_UserLogin_Result user)
        {
            string a = null;
            List<proc_UserLogin_Result> login = new List<proc_UserLogin_Result>();
            foreach (var item in db.proc_UserLogin())
            {
                login.Add(item);
            }
            foreach (var item in login)
            {
                if (item.Email == user.Email && item.Password == user.Password)
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

        //// GET: api/Users/5
        //[ResponseType(typeof(tblUser))]
        //[HttpPost]
        //public IHttpActionResult PosttblUser(string id, string Email, [FromBody] string Password)
        //{
        //    string a = null;
        //    db.proc_UserLogin();
        //    List<proc_UserLogin_Result> login = new List<proc_UserLogin_Result>();
        //    foreach (var item in db.proc_UserLogin())
        //    {
        //        login.Add(item);
        //    }
        //    foreach (var item in login)
        //    {
        //        if(item.Email==Email&&item.Password==Password)
        //        {
        //            FormsAuthentication.SetAuthCookie(item.Email, false);
        //            a = "Logged in";
        //        }
        //    }

        //    //tblUser tblUser = db.tblUsers.Find(id);
        //    if ( a== null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(a);
        //}

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblUser(string id, tblUser tblUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblUser.UserID)
            {
                return BadRequest();
            }

            db.Entry(tblUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblUserExists(id))
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

        //// POST: api/Users
        //[ResponseType(typeof(tblUser))]
        //public IHttpActionResult PosttblUser(tblUser tblUser)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    db.proc_UserRegisteration(tblUser.Title, tblUser.FirstName, tblUser.LastName, tblUser.DOB, tblUser.PhoneNo, tblUser.Email, tblUser.Password);
        //    //db.tblUsers.Add(tblUser);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = tblUser.UserID }, tblUser);
        //}

        // DELETE: api/Users/5
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