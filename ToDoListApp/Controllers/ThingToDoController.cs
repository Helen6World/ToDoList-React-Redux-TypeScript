using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListApp.Models;

namespace ToDoListApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class ThingToDoController : ControllerBase
    {
        private readonly ThingsToDoDBContext _context;

        public ThingToDoController(ThingsToDoDBContext context)
        {
            _context = context;
        }

        
       [HttpGet]
        public async Task<ActionResult<IEnumerable<ThingToDo>>> GetThingsToDo()
        {
            return await _context.ThingsToDo.ToListAsync();
        }



        //[HttpGet]
        //public IEnumerable<ThingToDo> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new ThingToDo
        //    {
        //        Content = "abc",
        //        IsDone = true

        //    })
        //    .ToArray();
        //}



        
        [HttpGet("{id}")]
        public async Task<ActionResult<ThingToDo>> GetThingToDo(int id)
        {
            var thingToDo = await _context.ThingsToDo.FindAsync(id);

            if (thingToDo == null)
            {
                return NotFound();
            }

            return thingToDo;
        }

        
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThingToDo(int id, ThingToDo thingToDo)
        {
            thingToDo.Id = id;

            //if (id != thingToDo.Id)
            //{
            //    return BadRequest();
            //}

            _context.Entry(thingToDo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThingToDoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ThingToDo>> PostThingToDo(ThingToDo thingToDo)
        {
            _context.ThingsToDo.Add(thingToDo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetThingToDo", new { id = thingToDo.Id }, thingToDo);
        }

       
        [HttpDelete("{id}")]
        public async Task<ActionResult<ThingToDo>> DeleteThingToDo(int id)
        {
            var thingToDo = await _context.ThingsToDo.FindAsync(id);
            if (thingToDo == null)
            {
                return NotFound();
            }

            _context.ThingsToDo.Remove(thingToDo);
            await _context.SaveChangesAsync();

            return thingToDo;
        }

        private bool ThingToDoExists(int id)
        {
            return _context.ThingsToDo.Any(e => e.Id == id);
        }
    }
}
