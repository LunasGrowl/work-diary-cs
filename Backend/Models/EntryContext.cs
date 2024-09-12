using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class EntryContext : DbContext
    {
        public EntryContext(DbContextOptions<EntryContext> options) : base(options) { 
        }
        public DbSet<Entry> Entries { get; set; }

    }
}
