using Backend.Context;
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

        private readonly LogContext _logContext;

        public EntryController(LogContext logContext)
        {
            _logContext = logContext;

            _logContext.Database.EnsureCreated();
        }

        [HttpGet]
        public ActionResult getAllEntry()
        {
            return Ok(_logContext.Entries.ToArray());
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
        public async Task<ActionResult> putEntry(int id, Entry entry)
        {
            _logContext.Entry(entry).State = EntityState.Modified;

            if (id != entry.Id) 
            {
                return NotFound();
            }

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
