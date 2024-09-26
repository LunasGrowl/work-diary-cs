using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Entry
    {
        // ID for each entry
        public int Id { get; set; }
        // The date value for each entry
        [Required]
        public string Entry_Date { get; set; } = string.Empty;
        // The day value for each entry
        [Required]
        public string Entry_Day { get; set; } = string.Empty ;
        // The content value for each entry
        [Required]
        public string Entry_Content { get; set; } = string.Empty;
        // The day the entry was edited

        public string Entry_Modify_Date {  get; set; } = string.Empty;

    }
}
