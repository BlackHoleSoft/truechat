using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrueChat.Models
{
    public class MessagesContext : DbContext
    {
        public static string Connection { get; set; }

        public DbSet<MessageData> Messages { get; set; }

        public MessagesContext()
        {
            Database.EnsureCreated();
        }

        public MessagesContext(DbContextOptions<MessagesContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Connection);
        }
    }
}
