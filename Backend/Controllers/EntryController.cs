using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {

        private readonly EntryContext _logContext;

        public EntryController(EntryContext logContext)
        {
            _logContext = logContext;

            //_logContext.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<ActionResult<List<Entry>>> getAllEntry()
        {
            return Ok(await _logContext.Entries.ToListAsync());
        }

        [HttpGet, Route("{id}")]
        public ActionResult getEntry(int id)
        {
            var entry = _logContext.Entries.Find(id);
            if (entry == null)
            {
                return NotFound();
            }
            return Ok(entry);
        }

        [HttpPost]
        public async Task<ActionResult> postEntry(Entry entry)
        {
            _logContext.Entries.Add(entry);
            await _logContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut, Route("{id}")]
        public async Task<ActionResult> putEntry(int id, string entry_content, string entry_day , string entry_date)
        {
            var entry = _logContext.Entries.Find(id);
            if (entry == null)
            {
                return NotFound();
            }

            entry.Entry_Content = entry_content;
            entry.Entry_Date = entry_date;
            entry.Entry_Day = entry_day;
            

            await _logContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete, Route("{id}")]
        public async Task<ActionResult> deleteEntry(int id)
        {
            var entry = await _logContext.Entries.FindAsync(id);

            if(entry == null)
            {
                return NotFound();
            }

            _logContext.Entries.Remove(entry);
            await _logContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
