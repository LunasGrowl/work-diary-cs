using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Entry
    {

        public int Id { get; set; }
        [Required]
        public string Entry_Date { get; set; } = string.Empty;
        [Required]
        public string Entry_Day { get; set; } = string.Empty ;
        [Required]
        public string Entry_Content { get; set; } = string.Empty;

    }
}
