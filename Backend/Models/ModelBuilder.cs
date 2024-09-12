using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public static class ModelBuilderExension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entry>().HasData(
                new Entry { Id = 1, Entry_Day = "Wednesday", Entry_Date = "23/12/2000", Entry_Content = "Testing the api" }
                );
        }

    }
}
