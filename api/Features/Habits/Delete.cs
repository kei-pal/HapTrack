using Microsoft.AspNetCore.Mvc;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
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
}