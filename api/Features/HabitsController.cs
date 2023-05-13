﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Domain;

namespace api.Features
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly HtContext _context;

        public HabitsController(HtContext context)
        {
            _context = context;
        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habit>>> GetHabits()
        {
          if (_context.Habits == null)
          {
              return NotFound();
          }
            return await _context.Habits.ToListAsync();
        }

        // GET: api/Habits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habit>> GetHabit(Guid id)
        {
          if (_context.Habits == null)
          {
              return NotFound();
          }
            var habit = await _context.Habits.FindAsync(id);

            if (habit == null)
            {
                return NotFound();
            }

            return habit;
        }

        // PUT: api/Habits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabit(Guid id, Habit habit)
        {
            if (id != habit.Id)
            {
                return BadRequest();
            }

            _context.Entry(habit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitExists(id))
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

        // POST: api/Habits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Habit>> PostHabit(Habit habit)
        {
          if (_context.Habits == null)
          {
              return Problem("Entity set 'HtContext.Habits'  is null.");
          }
            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHabit", new { id = habit.Id }, habit);
        }

        // DELETE: api/Habits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(Guid id)
        {
            if (_context.Habits == null)
            {
                return NotFound();
            }
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }

            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitExists(Guid id)
        {
            return (_context.Habits?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
