using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrueChat.Models;

namespace TrueChat.Controllers
{
    [Produces("application/json")]
    [Route("api/Chat")]    
    public class ChatController : Controller
    {
        public const int CHUNK_SIZE = 10;

        [HttpGet("[action]/{chunk}")]
        public IEnumerable<MessageData> ChatData(int chunk)
        {
            int count = DbController.Db.Messages.Count();
            int start = count - (chunk + 1) * CHUNK_SIZE;
            int end = start + CHUNK_SIZE;
            if (start < 0)
                start = 0;            
            var entries = new List<MessageData>();
            var all = DbController.Db.Messages.ToList();
            for (int i=start; i<end; i++)
            {
                entries.Add(all[i]);
            }
            return entries;
        }
                
        [HttpGet("[action]")]         
        public UserData Username()
        {
            return new UserData { Name = (User.Identity.Name ?? "")};
        }
    }

    public class UserData
    {
        public string Name { get; set; }
    }
}