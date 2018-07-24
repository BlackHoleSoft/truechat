using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrueChat.Models;

namespace TrueChat.Controllers
{    
    public class HomeController : Controller
    {        
        public IActionResult Index(MessagesContext dbContext)
        {
            DbController.Db = dbContext;
            if (User.Identity.IsAuthenticated)
            {                
                return View();
            }
            else
            {
                return Redirect("/Auth/Login");
            }
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }

    public class DbController
    {
        public static MessagesContext Db { get; set; }
    }
}
