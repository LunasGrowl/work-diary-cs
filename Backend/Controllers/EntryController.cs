using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Asp.Versioning;

namespace Backend.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/Entry")]
    [ApiController]
    public class EntryV1Controller : ControllerBase
    {

        private readonly EntryContext _logContext;

        public EntryV1Controller(EntryContext logContext)
        {
            _logContext = logContext;

            //_logContext.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<ActionResult<List<Entry>>> getAllEntry([FromQuery]EntryQueryParameters queryParameters)
        {
            IQueryable<Entry> entries = _logContext.Entries;
            
            if (queryParameters.Day != null)
            {
                entries = entries.Where(
                    p => p.Entry_Day.Equals(queryParameters.Day));
            }
            var list = await entries.ToListAsync();
            list = list.OrderBy(e => e.Entry_Date).ThenBy(e => e.Entry_Day).ToList();
            return Ok(list);
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
        public async Task<ActionResult> putEntry(int id, string entry_content, string entry_day , string entry_date, string entry_modify_date, string entry_modify_time)
        {
            var entry = _logContext.Entries.Find(id);
            if (entry == null)
            {
                return NotFound();
            }

            entry.Entry_Content = entry_content;
            entry.Entry_Date = entry_date;
            entry.Entry_Day = entry_day;
            entry.Entry_Modify_Date = entry_modify_date;
            entry.Entry_Modify_Time = entry_modify_time;


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

    // All version 2 controllers
    [ApiVersion("2.0")]
    [Route("api/Entry")]
    [ApiController]
    public class EntryV2Controller : ControllerBase
    {

        private readonly EntryContext _logContext;

        
        public EntryV2Controller(EntryContext logContext)
        {
            _logContext = logContext;
        }

        // Return Entries in date added order
        [HttpGet]
        public async Task<ActionResult<List<Entry>>> getAllEntry([FromQuery] EntryQueryParameters queryParameters)
        {
            IQueryable<Entry> entries = _logContext.Entries;

            if (queryParameters.Day != null)
            {
                entries = entries.Where(
                    p => p.Entry_Modify_Date.Equals(queryParameters.Day));
            }
            var list = await entries.ToListAsync();
            list = list.OrderBy(e => e.Entry_Modify_Date).ThenBy(e => e.Entry_Modify_Time).ToList();
            return Ok(list);
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
        public async Task<ActionResult> putEntry(int id, string entry_content, string entry_day, string entry_date)
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

            if (entry == null)
            {
                return NotFound();
            }

            _logContext.Entries.Remove(entry);
            await _logContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
