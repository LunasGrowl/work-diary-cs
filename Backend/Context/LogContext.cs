using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using Backend.Models;

namespace Backend.Context
{
    public class LogContext : DbContext
    {

        public LogContext(DbContextOptions<LogContext> options):base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entry>();
            modelBuilder.Seed();
        }

        public DbSet<Entry> Entries { get; set; }
    }
}
