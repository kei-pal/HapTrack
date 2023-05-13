using api.Domain;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
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
}