using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrueChat.Controllers;

namespace TrueChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string username, string message, string color)
        {
            await DbController.Db.Messages.AddAsync(new Models.MessageData
            {
                Author = Context.User.Identity.Name,
                Message = message,
                Date = (long)(DateTime.Now.Subtract(new DateTime(1970, 1, 1))).TotalMilliseconds,
                Color = color
            });
            await DbController.Db.SaveChangesAsync();          
            await Clients.All.SendAsync("ReceiveMessage", username, message, color);
        }
    }
}
