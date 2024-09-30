using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
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

            // 
            // //_logContext.Database.EnsureCreated();
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

            Uri uri = new Uri($"https://localhost:7071/api/Entry/" + entry.Id);

            return Created(uri, entry);
        }

        [HttpPut("{id}")]
        public  async Task<ActionResult> putEntry(int id,[FromBody]Entry update)
        {
            if(id != update.Id)
            {
                return NotFound();
            }

            _logContext.Entry(update).State = EntityState.Modified;

            await _logContext.SaveChangesAsync();

           
            return Ok();
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
    }
}
