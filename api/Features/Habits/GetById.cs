using api.Domain.Habits;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
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
}
