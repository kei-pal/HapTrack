using api.Domain.Habits;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
    // PUT: api/Habits/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutHabit(Guid id, Habit habit)
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);
        if (user == null) { return NotFound(); }
        if (habit.User != user) { return Unauthorized(); }

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

    private bool HabitExists(Guid id)
    {
        return (_context.Habits?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}

